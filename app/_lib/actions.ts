"use server";

import { supabase } from "./supabase";

export async function getPositions(): Promise<ActionReturn<PositionData[]>> {
  try {
    const { data, error } = await supabase
      .from("positions")
      .select("*")
      .order("time", { ascending: true })
      .limit(5);

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Something unexpected happened",
    };
  }
}

export async function addPosition(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  if (!data.name || !data.time) return;
  const { data: _, error } = await supabase
    .from("positions")
    .insert([{ name: data.name, time: data.time }]);
  if (error) console.error(error);
}

export async function deletePosition(id: string) {
  const { error } = await supabase.from("positions").delete().eq("id", id);
  if (error) {
    console.log(error);
  }
}
