import {
  Store, Rocket, Zap, Crown, Flame, Presentation, Car, Users, Lightbulb,
  Briefcase, BatteryCharging, Bike, Cpu, Truck, ShieldCheck, Wrench, PlugZap,
  Settings2, FlaskConical, Banknote, Globe2, Factory, Gauge, Cog, Target, Eye,
  HeartHandshake, MapPin, TrendingUp, Landmark, Handshake, GraduationCap, Leaf,
  Search, LayoutGrid, BadgeCheck, Megaphone, Mail, Phone, Clock, Plane,
  TramFront, CalendarDays, Gem, Award, Star, Trophy, Sparkles, Building2,
  Wallet, Recycle, Cable, Fuel, Radio, Cpu as Chip,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon name → component registry.
 * Editors can type any of these names (case-insensitive) into an "Icon"
 * column in the Google Sheet. Unknown names use the section's fallback.
 */
const ICONS: Record<string, LucideIcon> = {
  store: Store, rocket: Rocket, zap: Zap, crown: Crown, flame: Flame,
  presentation: Presentation, car: Car, users: Users, lightbulb: Lightbulb,
  briefcase: Briefcase, batterycharging: BatteryCharging, bike: Bike, cpu: Cpu,
  chip: Chip, truck: Truck, shieldcheck: ShieldCheck, wrench: Wrench,
  plugzap: PlugZap, settings2: Settings2, flaskconical: FlaskConical,
  banknote: Banknote, globe2: Globe2, factory: Factory, gauge: Gauge, cog: Cog,
  target: Target, eye: Eye, hearthandshake: HeartHandshake, mappin: MapPin,
  trendingup: TrendingUp, landmark: Landmark, handshake: Handshake,
  graduationcap: GraduationCap, leaf: Leaf, search: Search, layoutgrid: LayoutGrid,
  badgecheck: BadgeCheck, megaphone: Megaphone, mail: Mail, phone: Phone,
  clock: Clock, plane: Plane, tramfront: TramFront, calendardays: CalendarDays,
  gem: Gem, award: Award, star: Star, trophy: Trophy, sparkles: Sparkles,
  building2: Building2, wallet: Wallet, recycle: Recycle, cable: Cable,
  fuel: Fuel, radio: Radio,
};

/** Normalise "Battery Charging", "battery-charging", "BatteryCharging" → key. */
function normalise(name: string) {
  return name.toLowerCase().replace(/[\s_-]+/g, "");
}

export function resolveIcon(name: string, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return ICONS[normalise(name)] ?? fallback;
}
