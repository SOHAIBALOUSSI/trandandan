export async function check2FA(): Promise<
  Array<{ type: "app" | "email"; enabled: 1 | 0; is_primary: 1 | 0 }>
> {
  try {
    const res = await fetch("/2fa/", { credentials: "include" });
    const json = await res.json();
    if (res.ok) {
      return json.data.methods;
    }
    return [];
  } catch (err) {
    return [];
  }
}
