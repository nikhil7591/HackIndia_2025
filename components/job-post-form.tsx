"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/components/wallet-provider"
import { analyzeTrustScore } from "@/lib/ai-service"
import { postJob } from "@/lib/smart-contract"
import { X, Plus, AlertTriangle, Shield } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  salary: z.string().min(1, "Salary information is required"),
  requirements: z.array(z.string()).min(2, "At least 2 requirements are needed"),
  reward: z.string().min(1, "Token reward amount is required"),
})

type FormValues = z.infer<typeof formSchema>

export function JobPostForm() {
  const [requirements, setRequirements] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [trustScore, setTrustScore] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const router = useRouter()
  const { isConnected, signer } = useWallet()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "",
      description: "",
      salary: "",
      requirements: [],
      reward: "10",
    },
  })

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      const updatedRequirements = [...requirements, newRequirement.trim()]
      setRequirements(updatedRequirements)
      form.setValue("requirements", updatedRequirements)
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index)
    setRequirements(updatedRequirements)
    form.setValue("requirements", updatedRequirements)
  }

  const analyzeJob = () => {
    const formData = form.getValues()

    if (!formData.title || !formData.description || requirements.length < 2) {
      toast({
        title: "Missing information",
        description: "Please fill in the job title, description, and at least 2 requirements",
        variant: "destructive",
      })
      return
    }

    const score = analyzeTrustScore({
      title: formData.title,
      description: formData.description,
      company: formData.company,
      requirements,
    })

    setTrustScore(score)

    toast({
      title: "Job Analysis Complete",
      description: `Your job posting has a Trust Score of ${score}%`,
    })
  }

  const onSubmit = async (data: FormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to post a job",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // For the hackathon, we'll simulate the blockchain transaction
      // In a real implementation, this would call the smart contract

      if (signer) {
        await postJob(signer, data.title, data.description, data.reward, data.requirements)
      }

      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted to the blockchain",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error posting job:", error)
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. TechCorp Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Remote, New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job responsibilities, qualifications, and other details..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={() => (
                <FormItem>
                  <FormLabel>Job Requirements</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. 3+ years of React experience"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addRequirement()
                          }
                        }}
                      />
                      <Button type="button" onClick={addRequirement}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 mt-2">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span className="text-sm">{req}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {requirements.length === 0 && (
                      <p className="text-sm text-muted-foreground">Add at least 2 requirements for the job</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Blockchain Settings</h3>

              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Reward (MATIC)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Amount of MATIC tokens to reward qualified applicants (on Mumbai testnet)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {trustScore !== null && (
                <div
                  className={`p-4 rounded-md ${
                    trustScore >= 80
                      ? "bg-green-50 dark:bg-green-950"
                      : trustScore >= 60
                        ? "bg-blue-50 dark:bg-blue-950"
                        : trustScore >= 40
                          ? "bg-amber-50 dark:bg-amber-950"
                          : "bg-red-50 dark:bg-red-950"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Shield
                      className={`h-5 w-5 mt-0.5 ${
                        trustScore >= 80
                          ? "text-green-600 dark:text-green-400"
                          : trustScore >= 60
                            ? "text-blue-600 dark:text-blue-400"
                            : trustScore >= 40
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-600 dark:text-red-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">Trust Score: {trustScore}%</p>
                      <p className="text-sm mt-1">
                        {trustScore >= 80
                          ? "Excellent! Your job posting appears legitimate and detailed."
                          : trustScore >= 60
                            ? "Good. Your job posting meets most trust criteria."
                            : trustScore >= 40
                              ? "Fair. Consider adding more details to improve trust."
                              : "Low trust score. Your job posting may be flagged as potentially suspicious."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isConnected && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-md flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Please connect your wallet to post a job on the blockchain.
                  </p>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={analyzeJob}>
              Analyze Job
            </Button>
            <Button type="submit" disabled={isSubmitting || !isConnected}>
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
