import { useSyncExternalStore } from 'react'

/**
 * Consimtamantul vizitatorului pentru continutul extern (harta OpenStreetMap).
 * Alegerea se pastreaza in localStorage — stocare strict necesara, fara cookie-uri.
 *   null                → vizitatorul nu a ales inca
 *   { external: bool }  → a acceptat / a refuzat continutul extern
 */
const KEY = 'cf-consent'
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000 // alegerea se cere din nou dupa 12 luni

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (!saved || typeof saved.external !== 'boolean') return null
    if (Date.now() - new Date(saved.date).getTime() > MAX_AGE_MS) return null
    return saved
  } catch {
    return null
  }
}

let current = read()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setConsent(external) {
  current = { external, date: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(current))
  } catch {
    // stocare indisponibila (ex. navigare privata) — alegerea tine doar pana la reincarcare
  }
  listeners.forEach((listener) => listener())
}

export function useConsent() {
  return useSyncExternalStore(subscribe, () => current)
}
