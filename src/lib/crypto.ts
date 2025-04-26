const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'fallback-secret-key';

export function encryptData(data: string): string {
  return btoa(data);  // This is a simple base64 encoding, not true encryption
}

export function decryptData(encryptedData: string): string {
  return atob(encryptedData);  // This decodes the base64 string
}