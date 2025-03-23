export const formatEmploymentStatus = (date: string | Date): string => {
  const employmentDate = new Date(date)
  const today = new Date()
  if (employmentDate > today) {
    return 'Employed soon'
  }
  return 'Currently employed'
}

export const formatTerminationStatus = (date: string | Date | null): string => {
  if (!date) return 'N/A'
  const terminationDate = new Date(date)
  const today = new Date()
  if (terminationDate > today) {
    return 'To be terminated'
  }
  return 'Terminated'
}

export const formatDate = (date: string | Date | null): string => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
} 