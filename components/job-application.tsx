"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/components/wallet-provider"
import { applyForJob } from "@/lib/smart-contract"
import { matchApplicantToJob } from "@/lib/ai-service"
import { X, Plus, AlertTriangle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  qualifications: z.array(z.string()).min(1, "At least one qualification is required"),
})

type FormValues = z.infer<typeof formSchema>

interface JobApplicationProps {
  jobId: number
}

export function JobApplication({ jobId }: JobApplicationProps) {
  const [qualifications, setQualifications] = useState<string[]>([])
  const [newQualification, setNewQualification] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [matchResult, setMatchResult] = useState<{ matchScore: number; matchedQualifications: string[] } | null>(null)

  const { toast } = useToast()
  const { isConnected, signer } = useWallet()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      coverLetter: "",
      qualifications: [],
    },
  })

  const addQualification = () => {
    if (newQualification.trim() && !qualifications.includes(newQualification.trim())) {
      const updatedQualifications = [...qualifications, newQualification.trim()]
      setQualifications(updatedQualifications)
      form.setValue("qualifications", updatedQualifications)
      setNewQualification("")
    }
  }

  const removeQualification = (index: number) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index)
    setQualifications(updatedQualifications)
    form.setValue("qualifications", updatedQualifications)
  }

  const checkMatch = () => {
    if (qualifications.length === 0) {
      toast({
        title: "No qualifications",
        description: "Please add your qualifications to check for a match",
        variant: "destructive",
      })
      return
    }

    // Mock job requirements (in a real app, these would come from your API/blockchain)
    const jobRequirements = [
      "5+ years of experience in frontend development",
      "Strong knowledge of React",
      "Experience with Next.js",
      "TypeScript experience",
      "CSS frameworks",
    ]

    const result = matchApplicantToJob(jobRequirements, qualifications)
    setMatchResult(result)

    toast({
      title: `Match Score: ${result.matchScore}%`,
      description:
        result.matchScore >= 60
          ? "You're a good match for this job!"
          : "You might want to add more relevant qualifications",
    })
  }

  const onSubmit = async (data: FormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to apply for this job",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // For the hackathon, we'll simulate the blockchain transaction
      // In a real implementation, this would call the smart contract

      if (signer) {
        await applyForJob(signer, jobId, data.qualifications)
      }

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully",
      })

      form.reset()
      setQualifications([])
      setMatchResult(null)
    } catch (error) {
      console.error("Error applying for job:", error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this Job</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qualifications"
              render={() => (
                <FormItem>
                  <FormLabel>Your Qualifications</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. 5 years of React experience"
                        value={newQualification}
                        onChange={(e) => setNewQualification(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addQualification()
                          }
                        }}
                      />
                      <Button type="button" onClick={addQualification}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 mt-2">
                      {qualifications.map((qual, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span className="text-sm">{qual}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeQualification(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {qualifications.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Add your qualifications to match with job requirements
                      </p>
                    )}

                    {qualifications.length > 0 && (
                      <Button type="button" variant="outline" size="sm" onClick={checkMatch} className="mt-2">
                        Check Match
                      </Button>
                    )}

                    {matchResult && (
                      <div
                        className={`mt-2 p-3 rounded-md ${
                          matchResult.matchScore >= 80
                            ? "bg-green-50 dark:bg-green-950"
                            : matchResult.matchScore >= 60
                              ? "bg-blue-50 dark:bg-blue-950"
                              : matchResult.matchScore >= 40
                                ? "bg-amber-50 dark:bg-amber-950"
                                : "bg-red-50 dark:bg-red-950"
                        }`}
                      >
                        <p className="font-medium">Match Score: {matchResult.matchScore}%</p>
                        {matchResult.matchedQualifications.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Matched Qualifications:</p>
                            <ul className="text-sm mt-1 list-disc pl-5">
                              {matchResult.matchedQualifications.map((qual, index) => (
                                <li key={index}>{qual}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're a good fit for this position..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isConnected && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-300">Wallet not connected</p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Please connect your wallet to apply for this job. Your application will be verified on the
                    blockchain.
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting || !isConnected}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
