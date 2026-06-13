import CockpitPanel from "../components/CockpitPanel";

export const dynamic = 'force-dynamic';

export default function CockpitPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <CockpitPanel />
    </div>
  );
}
