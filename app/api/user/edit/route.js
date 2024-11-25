// route.js
import { updateUser } from "../../../lib/actions/updateUser";

export async function PUT(request) {
  try {
    const result = await updateUser(request.nextUrl.searchParams);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, errors: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
