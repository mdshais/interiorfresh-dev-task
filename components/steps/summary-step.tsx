"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormData } from "@/types/form"

interface SummaryStepProps {
  data: FormData
  onPrevious: () => void
  onSubmit: (data: FormData) => Promise<void>
}

const roomTypes = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "kitchen", name: "Kitchen" },
  { id: "office", name: "Office" },
] as const

export function SummaryStep({ data, onPrevious, onSubmit }: SummaryStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedRoom = useMemo(
    () => roomTypes.find((room) => room.id === data.roomSelection.type),
    [data.roomSelection.type],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      try {
        await onSubmit(data)
        setIsSubmitted(true)
      } catch (error) {
        console.error("Submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [data, onSubmit],
  )

  if (isSubmitted) {
    return (
      <section className="text-center space-y-6" aria-labelledby="success-heading">
        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h2 id="success-heading" className="text-2xl font-bold text-gray-900 mb-2">
            Project Submitted Successfully!
          </h2>
          <p className="text-gray-600">Your interior design project has been created.</p>
        </div>
        <Button onClick={() => window.location.reload()}>Create Another Project</Button>
      </section>
    )
  }

  return (
    <section className="space-y-6" aria-labelledby="summary-heading">
      <div>
        <h2 id="summary-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Project Summary
        </h2>
        <p className="text-gray-600">Please review your project details before submitting.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Project Name</h3>
              <p className="text-gray-700">{data.projectDetails.name}</p>
            </div>
            {data.projectDetails.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
                <p className="text-gray-700">{data.projectDetails.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Room Type</h3>
              <p className="text-gray-700">{selectedRoom?.name}</p>
            </div>
            {data.roomSelection.size && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Room Size</h3>
                <p className="text-gray-700 capitalize">{data.roomSelection.size}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Project"
            )}
          </Button>
        </div>
      </form>
    </section>
  )
}
