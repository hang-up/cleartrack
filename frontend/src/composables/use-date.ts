const useDate = () => {
  const formatDate = (value: Date) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return {
    formatDate
  }
}

export { useDate }
