"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ProjectDetails } from "@/types/form"
import { validateProjectDetails, sanitizeInput } from "@/lib/validation"

interface ProjectDetailsStepProps {
  data: ProjectDetails
  onNext: (data: ProjectDetails) => void
}

export function ProjectDetailsStep({ data, onNext }: ProjectDetailsStepProps) {
  const [formData, setFormData] = useState<ProjectDetails>(data)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        description: sanitizeInput(formData.description),
      }
      const validationErrors = validateProjectDetails(sanitizedData)
      if (validationErrors.length > 0) {
        setErrors(validationErrors)
        return
      }
      setErrors([])
      onNext(sanitizedData)
    },
    [formData, onNext],
  )

  return (
    <section className="space-y-6" aria-labelledby="project-details-heading">
      <div>
        <h2 id="project-details-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Project Details
        </h2>
        <p className="text-gray-600">
          Let's start by gathering some basic information about your interior design project.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name *</Label>
          <Input
            id="project-name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your project name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Project Description</Label>
          <Textarea
            id="project-description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your vision for this project (optional)"
            className="min-h-[100px]"
            rows={4}
          />
          <p className="text-sm text-gray-500">{formData.description.length}/500</p>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </section>
  )
}
