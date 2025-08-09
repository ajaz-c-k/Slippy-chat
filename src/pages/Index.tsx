// // pages/Index.tsx
// import { Loginpages } from "@/components/Loginpages";

// export default function Index() {
//   // We don't need any props here because LoginPage handles its own navigation
//   return <Loginpages />;
// }


// pages/Index.tsx
// Changed from named import { Loginpages } to default import Loginpages
import Loginpages from "@/components/Loginpages";

export default function Index() {
  // We don't need any props here because LoginPage handles its own navigation
  return <Loginpages />;
}