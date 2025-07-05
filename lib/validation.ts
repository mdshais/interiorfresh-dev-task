import type { ProjectDetails, RoomSelection } from "@/types/form"

export const validateProjectDetails = (data: ProjectDetails): string[] => {
  const errors: string[] = []
  const name = data.name.trim()

  if (!name) errors.push("Project name is required")
  if (name.length > 100) errors.push("Project name must be less than 100 characters")
  if (data.description.length > 500) errors.push("Project description must be less than 500 characters")

  return errors
}

export const validateRoomSelection = (data: RoomSelection): string[] => (data.type ? [] : ["Please select a room type"])

export const sanitizeInput = (input: string): string => input.replace(/<[^>]*>/g, "").trim()
