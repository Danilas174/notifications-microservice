function CheckType(type: string): boolean | undefined {
  const subscribe = 'subscribe';
  const unsubscribe = 'unsubscribe';
  return type === subscribe || type === unsubscribe || undefined;
}
