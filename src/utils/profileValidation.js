import { z } from "zod";

// Profile validation schemas
export const personalInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(250, "Bio must be less than 250 characters")
    .optional(),
  skills: z
    .array(z.string().trim().min(1))
    .max(20, "Maximum 20 skills allowed")
    .optional(),
  experienceLevel: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional()
});

export const professionalInfoSchema = z.object({
  preferredTechStack: z
    .array(z.string().trim().min(1))
    .max(15, "Maximum 15 tech stack items allowed")
    .optional(),
  careerGoal: z
    .enum(["job", "freelancing", "learning", "other"])
    .optional(),
  availability: z
    .object({
      hoursPerWeek: z
        .number()
        .min(0, "Hours must be at least 0")
        .max(168, "Hours cannot exceed 168 per week")
        .optional()
    })
    .optional(),
  portfolioLinks: z
    .object({
      github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
      website: z.string().url("Invalid website URL").optional().or(z.literal("")),
      linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal(""))
    })
    .optional()
});

export const preferencesSchema = z.object({
  notifications: z
    .object({
      deadlines: z.boolean().optional(),
      messages: z.boolean().optional(),
      projectUpdates: z.boolean().optional()
    })
    .optional(),
  theme: z
    .enum(["light", "dark", "system"])
    .optional(),
  language: z
    .string()
    .min(2)
    .max(5)
    .optional()
});

export const updateProfileSchema = z.object({
  personal: personalInfoSchema.optional(),
  professional: professionalInfoSchema.optional(),
  preferences: preferencesSchema.optional(),
  customAvatar: z.string().url("Invalid avatar URL").optional().or(z.literal(""))
});

// Username availability check (used separately)
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be less than 30 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens");
