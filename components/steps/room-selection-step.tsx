"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { RoomSelection } from "@/types/form"
import { roomTypes, roomSizes } from "@/lib/room-data"
import { validateRoomSelection } from "@/lib/validation"

interface RoomSelectionStepProps {
  data: RoomSelection
  onNext: (data: RoomSelection) => void
  onPrevious: () => void
}

export function RoomSelectionStep({ data, onNext, onPrevious }: RoomSelectionStepProps) {
  const [formData, setFormData] = useState<RoomSelection>(data)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const validationErrors = validateRoomSelection(formData)
      if (validationErrors.length > 0) {
        setErrors(validationErrors)
        return
      }
      setErrors([])
      onNext(formData)
    },
    [formData, onNext],
  )

  return (
    <section className="space-y-6" aria-labelledby="room-selection-heading">
      <div>
        <h2 id="room-selection-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Room Type Selection
        </h2>
        <p className="text-gray-600">Choose the type of room you'd like to design.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-4">Select Room Type *</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomTypes.map((room) => (
              <div key={room.id}>
                <input
                  type="radio"
                  id={`room-${room.id}`}
                  name="room-type"
                  value={room.id}
                  checked={formData.type === room.id}
                  onChange={() => setFormData((prev) => ({ ...prev, type: room.id }))}
                  className="sr-only"
                />
                <label
                  htmlFor={`room-${room.id}`}
                  className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                    formData.type === room.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.description}</p>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-4">Room Size (Optional)</legend>
          <div className="flex gap-4">
            {roomSizes.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="radio"
                  id={`size-${size}`}
                  name="room-size"
                  value={size}
                  checked={formData.size === size}
                  onChange={() => setFormData((prev) => ({ ...prev, size: size as "small" | "medium" | "large" }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <Label htmlFor={`size-${size}`} className="ml-2 capitalize">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </fieldset>

        {errors.length > 0 && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-md p-4">
            <ul className="text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </section>
  )
}
