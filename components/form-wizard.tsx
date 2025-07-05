"use client"

import { useState, useCallback } from "react"
import type { FormData, FormStep, ProjectDetails, RoomSelection } from "@/types/form"
import { ProjectDetailsStep } from "./steps/project-details-step"
import { RoomSelectionStep } from "./steps/room-selection-step"
import { SummaryStep } from "./steps/summary-step"

const steps = [
  { id: "project-details" as FormStep, title: "Project Details", number: 1 },
  { id: "room-selection" as FormStep, title: "Room Selection", number: 2 },
  { id: "summary" as FormStep, title: "Summary", number: 3 },
]

export function FormWizard() {
  const [currentStep, setCurrentStep] = useState<FormStep>("project-details")
  const [formData, setFormData] = useState<FormData>({
    projectDetails: { name: "", description: "" },
    roomSelection: { type: "" },
  })

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const handleProjectDetailsNext = useCallback((data: ProjectDetails) => {
    setFormData((prev) => ({ ...prev, projectDetails: data }))
    setCurrentStep("room-selection")
  }, [])

  const handleRoomSelectionNext = useCallback((data: RoomSelection) => {
    setFormData((prev) => ({ ...prev, roomSelection: data }))
    setCurrentStep("summary")
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentStep === "room-selection") {
      setCurrentStep("project-details")
    } else if (currentStep === "summary") {
      setCurrentStep("room-selection")
    }
  }, [currentStep])

  const handleSubmit = useCallback(async (data: FormData) => {
    const response = await fetch("/api/submit-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to submit project")
    console.log("Project submitted:", data)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <nav aria-label="Form progress" className="mb-8">
        <ol className="flex items-center justify-center space-x-4 md:space-x-8">
          {steps.map((step, index) => (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                    index <= currentStepIndex
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    index <= currentStepIndex ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 ml-4 ${index < currentStepIndex ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        {currentStep === "project-details" && (
          <ProjectDetailsStep data={formData.projectDetails} onNext={handleProjectDetailsNext} />
        )}
        {currentStep === "room-selection" && (
          <RoomSelectionStep
            data={formData.roomSelection}
            onNext={handleRoomSelectionNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === "summary" && (
          <SummaryStep data={formData} onPrevious={handlePrevious} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}
