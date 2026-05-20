import { z } from 'zod'

export const REGION_STATUS_OPTIONS = ['active', 'maintenance', 'planned'] as const

const requiredText = (fieldName: string, minLength = 1) =>
  z
    .string()
    .trim()
    .min(minLength, `${fieldName} is required`)

const finiteNumber = (fieldName: string) =>
  z.coerce
    .number({ error: `${fieldName} must be a number` })
    .finite(`${fieldName} must be a valid number`)

export const regionSchema = z.object({
  villageName: requiredText('Village name', 2),
  myanmarName: requiredText('Myanmar name'),
  township: requiredText('Township', 2),
  coveragePercentage: finiteNumber('Coverage')
    .min(0, 'Coverage cannot be below 0')
    .max(100, 'Coverage cannot exceed 100'),
  estimatedUsers: finiteNumber('Estimated users')
    .int('Estimated users must be a whole number')
    .min(0, 'Estimated users cannot be negative'),
  monthlyRevenue: finiteNumber('Monthly revenue').min(0, 'Monthly revenue cannot be negative'),
  status: z.enum(REGION_STATUS_OPTIONS),
  latitude: finiteNumber('Latitude')
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: finiteNumber('Longitude')
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
})

export type RegionFormValues = z.infer<typeof regionSchema>

export const defaultRegionFormValues: RegionFormValues = {
  villageName: '',
  myanmarName: '',
  township: '',
  coveragePercentage: 65,
  estimatedUsers: 120,
  monthlyRevenue: 3500000,
  status: 'active',
  latitude: 21.9588,
  longitude: 96.0891,
}
