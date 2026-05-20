import type { Region } from '@/types'
import type { RegionFormValues } from '@/schemas/region.schema'

const MOCK_LATENCY_MS = 450

const waitForMockLatency = () => new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

export class DuplicateRegionError extends Error {
  constructor(regionName: string) {
    super(`Region "${regionName}" already exists`)
    this.name = 'DuplicateRegionError'
  }
}

function normalizeRegionName(value: string) {
  return value.trim().toLowerCase()
}

function nextRegionId(existingRegions: Region[]) {
  const maxNumericId = existingRegions.reduce((max, region) => {
    const match = /^REG-(\d+)$/.exec(region.id)
    return match ? Math.max(max, Number(match[1])) : max
  }, 0)

  return `REG-${String(maxNumericId + 1).padStart(2, '0')}`
}

export function hasDuplicateRegion(regionName: string, existingRegions: Region[]) {
  const normalizedName = normalizeRegionName(regionName)
  return existingRegions.some((region) => normalizeRegionName(region.villageName) === normalizedName)
}

export function calculateMockCoverageAnalytics(input: Pick<RegionFormValues, 'coveragePercentage' | 'estimatedUsers'>) {
  const coverage = Math.max(0, Math.min(100, input.coveragePercentage))
  const estimatedUsers = Math.max(0, input.estimatedUsers)
  const estimatedCoverageRadius = Math.round((coverage / 18 + 0.8) * 10) / 10
  const fiberDistance = Math.max(1.2, Math.round((coverage / 12 + estimatedUsers / 180) * 10) / 10)
  const signalQuality = Math.min(99, Math.max(48, Math.round(70 + coverage / 4 - fiberDistance / 3)))

  return {
    estimatedCoverageRadius,
    fiberDistance,
    signalQuality,
  }
}

export function buildMockRegion(input: RegionFormValues, existingRegions: Region[]): Region {
  const analytics = calculateMockCoverageAnalytics(input)

  return {
    id: nextRegionId(existingRegions),
    villageName: input.villageName.trim(),
    myanmarDescription: input.myanmarName.trim(),
    township: input.township.trim(),
    activeUsers: input.estimatedUsers,
    revenue: input.monthlyRevenue,
    coverage: input.coveragePercentage,
    lat: input.latitude,
    lng: input.longitude,
    status: input.status,
    estimatedCoverageRadius: analytics.estimatedCoverageRadius,
    fiberDistance: analytics.fiberDistance,
    signalQuality: analytics.signalQuality,
  }
}

export async function createMockRegion(input: RegionFormValues, existingRegions: Region[]): Promise<Region> {
  await waitForMockLatency()

  if (hasDuplicateRegion(input.villageName, existingRegions)) {
    throw new DuplicateRegionError(input.villageName)
  }

  return buildMockRegion(input, existingRegions)
}
