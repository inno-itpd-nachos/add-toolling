export function protector(_data: unknown): _data is never {
  console.error("protector: Should never be reached")
  return true
}
