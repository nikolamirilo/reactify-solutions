import SectionTitle from "../Common/SectionTitle";
import SingleService from "./SingleFeature";
import servicesData from "./servicesData";

const Services = () => {
  return (
    <>
      <section
        id="services"
        className="bg-primaryColor/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Our Services"
            paragraph="We specialize in delivering customized digital solutions designed to address your specific requirements and drive your success."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <SingleService key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
