const ITEMS = [
  "Mining & Drilling Chemicals",
  "Ferrous Metals",
  "Non-Ferrous Metals",
  "Minerals & Mud Chemicals",
  "Quartz & Fly Ash",
  "Global Trade",
  "Reliable Supply Chains",
  "B2B Industrial",
  "Quality Assured",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CapabilityStrip({ items }: { items?: any[] }) {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="hv-ticker" aria-label="Product categories" role="marquee">
      <div className="hv-ticker__track" aria-hidden="true">
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className="hv-ticker__item">
            <span className="hv-ticker__dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
