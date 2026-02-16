import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  )

  const { data } = await supabase
    .from("firms")
    .select("*")

  return Response.json(data)
}
