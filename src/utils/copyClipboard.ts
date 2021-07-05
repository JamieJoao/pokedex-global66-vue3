export const copyClipboard = async (textToCopy: string) => {
  if (window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy)
  }
}