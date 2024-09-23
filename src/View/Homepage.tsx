import Forcast from "../components/Forcast";
import Weather from "../components/Weather";
import { CityProvider } from "../context/Citycontext";

function Homepage() {
  return (
    <CityProvider>
      <div>
        <Forcast />
        <Weather />
        <Forcast days={7} />
      </div>
    </CityProvider>
  );
}

export default Homepage;
