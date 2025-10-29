import { create } from "zustand";
import { FeatureFlagState } from "@/domain/models/feature-flag-state";

export const useFeatureFlagStore = create<FeatureFlagState>(() => ({
    merchantHappiness: process.env.FF_MERCHANT_HAPPINESS === 'true',
    catastrophes: process.env.FF_CATASTROPHES === 'true'
}))