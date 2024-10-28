import { Context, Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .post(
    "/generate-image",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: { 
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt
            // parameters: {
            //   negative_prompt: "blurry, hd quality, distorted",
            //   num_inference_steps: 30,
            //   guidance_scale: 7.5,
            // }
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');

      return c.json({
        data: `data:image/png;base64,${base64}`
      });
    },
  );

export default app;
