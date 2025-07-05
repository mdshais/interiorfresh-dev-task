export interface ProjectDetails {
  name: string
  description: string
}

export interface RoomSelection {
  type: string
  size?: "small" | "medium" | "large"
}

export interface FormData {
  projectDetails: ProjectDetails
  roomSelection: RoomSelection
}

export type FormStep = "project-details" | "room-selection" | "summary"
