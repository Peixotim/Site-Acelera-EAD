import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import classroomModern from "@/public/assets/classroom-modern.jpg";
import courses from "@/json/cursos.json";

const Courses = () => {
  // Objeto re-adicionado para garantir que o componente funcione sem erros
  const featuredCourse = {
    title: "MBA Executivo",
    description: "Acelere sua carreira com nosso MBA voltado para executivos...",
    duration: "18 meses",
    students: "Turma limitada",
    rating: "5.0",
  };

  return (
    <section 
      id="cursos" 
      className="py-20 bg-background"
      itemScope 
      itemType="https://schema.org/ItemList" // Adiciona o Schema para lista de itens
    >
      <div className="container mx-auto px-4">
        {/* Header Section with SEO Optimization */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos <span className="text-primary">Cursos de Graduação</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos cursos de graduação em diversas áreas com qualidade acadêmica reconhecida.
            Formação completa para o mercado de trabalho com professores especialistas.
          </p>
        </header>

        {/* Featured Course com Schema Markup */}
        <article
          className="mb-16"
          itemScope
          itemType="https://schema.org/Course" // Schema para um curso
          itemProp="itemListElement" // Indica que este é um elemento da lista
        >
          <Card className="overflow-hidden shadow-elegant border-none">
            <div className="grid lg:grid-cols-2">
              <div className="relative">
                <img
                  src={classroomModern.src}
                  alt="Sala de aula moderna equipada com tecnologia para ensino superior" // alt text descritivo
                  className="w-full h-full object-cover min-h-[400px]"
                  itemProp="image" // Indica a imagem do curso
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Curso em Destaque
                </Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <meta itemProp="provider" content="Nome da Instituição" />
                <h2 itemProp="name" className="text-3xl font-bold mb-4 text-foreground">
                  {featuredCourse.title}
                </h2>
                <p itemProp="description" className="text-lg text-muted-foreground mb-6">
                  {featuredCourse.description}
                </p>

                <div className="flex items-center gap-6 mb-6 text-foreground">
                  <div className="flex items-center gap-2" itemProp="timeRequired">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{featuredCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span itemProp="educationalCredentialAwarded">{featuredCourse.students}</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    itemProp="aggregateRating"
                    itemScope
                    itemType="https://schema.org/AggregateRating"
                  >
                    <Star className="h-5 w-5 text-primary" />
                    <span itemProp="ratingValue">{featuredCourse.rating}</span>
                    <meta itemProp="bestRating" content="5" />
                    <meta itemProp="ratingCount" content="1" />
                  </div>
                </div>

                <ButtonLink
                  href="/cursos"
                  variant="default"
                  aria-label={`Saiba mais sobre o curso ${featuredCourse.title}`}
                >
                  Saiba Mais <ArrowRight className="ml-2 h-5 w-5" />
                </ButtonLink>
              </div>
            </div>
          </Card>
        </article>

        {/* Courses Grid with Semantic Markup */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {courses.courses.map((course, index) => (
            <li
              key={index}
              itemScope
              itemType="https://schema.org/Course" // Schema para cada curso
              itemProp="itemListElement" // Indica que é um item da lista
              role="listitem"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={`${course.color} text-primary-foreground`}
                      itemProp="educationalLevel"
                    >
                      {course.badge}
                    </Badge>
                    <div
                      className="flex items-center gap-1"
                      itemProp="aggregateRating"
                      itemScope
                      itemType="https://schema.org/AggregateRating"
                    >
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span itemProp="ratingValue" className="text-sm font-medium text-foreground">
                        {course.rating}
                      </span>
                      <meta itemProp="bestRating" content="5" />
                    </div>
                  </div>
                  <CardTitle
                    itemProp="name"
                    className="text-xl group-hover:text-primary transition-colors"
                  >
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p itemProp="description" className="text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2" itemProp="timeRequired">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span itemProp="educationalCredentialAwarded">{course.students}</span>
                    </div>
                  </div>
                  <Link href={`/cursos/${course.id}`} itemProp="url">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors bg-transparent"
                    >
                      Ver Detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        {/* CTA Section */}
        <footer className="text-center mt-16">
          <ButtonLink
            href="/cursos"
            size="lg"
            className="bg-primary hover:bg-orange-600 text-primary-foreground shadow-orange px-8"
            aria-label="Ver todos os cursos de graduação disponíveis"
          >
            Ver Todos os Cursos <ArrowRight className="ml-2 h-5 w-5" />
          </ButtonLink>
        </footer>
      </div>
    </section>
  );
};

export default Courses;