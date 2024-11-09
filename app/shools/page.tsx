"use client";

import Header from "@/components/open-spot/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/languageContext";
import Footer from "@/components/open-spot/footer";

export default function LandingPage() {
  const { texts } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="h-[100vh] grid grid-rows-[10vh_1fr_10vh] bg-sky-200">
      <Header />
      <main className="flex-1">
        <section className="flex justify-center h-screen w-full py-12 md:py-24 lg:py-32 xl:py-48  text-slate-800">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mx-4">
            <div className="space-y-2">
              <h1 className="text-3xl text-orange-600 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {texts.school.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-800">
                {/* <span className="font-bold text-2xl mr-2">Open Spot</span> */}
                {texts.school.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* <Button asChild size="lg">
                  <Link href="#signup">Get Started</Link>
                </Button> */}
              <Button variant="outline" size="lg" className="text-black">
                {texts.school.contactUs}
                <span className="icon-[cib--whatsapp] ml-2 w-6 h-6"></span>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {texts.school.whyChooseUs}
            </h2>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Instructores expertos",
                  icon: "icon-[game-icons--american-football-player]",
                  description:
                    "Aprende de los mejores en el campo, con años de experiencia.",
                },
                {
                  title: "Skateparks",
                  icon: "icon-[icon-park--skate]",
                  description:
                    "Entrena en espacios modernos y bien equipados, diseñados para un aprendizaje óptimo.",
                },
                {
                  title: "Comunidad solidaria",
                  icon: "icon-[healthicons--community-meeting-negative]",
                  description:
                    "Únete a una vibrante comunidad de personas afines apasionadas por el movimiento.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    {/* <feature.icon className="h-12 w-12 mb-4 text-primary" /> */}
                    <span
                      className={`${feature.icon} w-32 h-32 mx-auto`}
                    ></span>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="sports"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {texts.school.schools}
            </h2>
            <Tabs
              defaultValue="rollerblading"
              className="w-full max-w-3xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rollerblading">
                  {texts.school.skating}
                </TabsTrigger>
                <TabsTrigger value="running">
                  {texts.school.running}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rollerblading">
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
                    {/* <Bike className="h-12 w-12 text-primary" /> */}
                    <span className="icon-[icon-park--rollerskates] w-16 h-16"></span>
                    <div>
                      <h3 className="text-xl font-bold">
                        Escuela de Rollerblading, Downhill, Rollerskate y
                        Urbano.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Desde principiantes hasta patinadores avanzados,
                        nuestras clases de patinaje en línea se adaptan a todos
                        los niveles de habilidad. Aprende técnicas adecuadas,
                        seguridad y trucos emocionantes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="running">
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
                    <span className="icon-[noto-v1--running-shoe] w-12 h-12"></span>
                    <div>
                      <h3 className="text-xl font-bold">Escuela de Running</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cursos intensivos centrados en técnicas avanzadas,
                        preparación para competiciones o habilidades
                        específicas. Lleva tus habilidades al siguiente nivel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section
          id="pricing"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {texts.school.plans}
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: texts.school.groupClasses,
                  icon: "icon-[ls--group]",
                  price: texts.school.groupClassesPrice,
                  description: texts.school.groupClassesDescription,
                },
                {
                  title: texts.school.personalTraining,
                  icon: "icon-[icon-park--focus-one]",
                  price: texts.school.personalTrainingPrice,
                  description: texts.school.personalTrainingDescription,
                },
                {
                  title: texts.school.specializedCourses,
                  icon: "icon-[arcticons--weatherbug-elite]",
                  price: texts.school.specializedCoursesPrice,
                  description: texts.school.specializedCoursesDescription,
                },
              ].map((rate, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                    {/* <rate.icon className="h-12 w-12 mb-4 text-primary" /> */}
                    {/* <span className="icon-[vaadin--group] w-10 h-10"></span> */}
                    <span className={`${rate.icon} w-32 h-32 mx-auto`}></span>
                    <h3 className="text-xl font-bold">{rate.title}</h3>
                    <p className="text-2xl font-bold text-primary">
                      {rate.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {rate.description}
                    </p>
                    <Button className="mt-4">Cotizar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {texts.school.whatOurStudentsSay}
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  name: texts.school.testimonial1Name,
                  text: texts.school.testimonial1Text,
                },
                {
                  name: texts.school.testimonial2Name,
                  text: texts.school.testimonial2Text,
                },
                {
                  name: texts.school.testimonial3Name,
                  text: texts.school.testimonial3Text,
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col justify-between p-6 text-center h-full">
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.text}
                    </p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="signup"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-black text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {texts.school.readyToStartTraining}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {texts.school.joinAcademyDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg bg-red-500"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
