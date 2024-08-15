# Edge functions

## Getting started

You'll need to follow
[this guide](https://supabase.com/docs/guides/functions/quickstart) to get you
set up.

## Local development

To run your functions locally, you can try the following:

```bash
supabase start
supabase functions serve

# In another terminal, hit the endpoint with the appropriate url & payload
curl -i --location --request POST 'http://127.0.0.1:65432/functions/v1/<your-funciton-name>' \
 --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
 --header 'Content-Type: application/json' \
 --data '{"name":"Functions"}'
```
