"use client"

import { useState } from "react"
import { Search, TrendingUp, Building, ChevronRight, Star, Award, Target, Download } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      title: "Executive Search Services",
      icon: <Search className="w-8 h-8" />,
      description: "Comprehensive executive search solutions tailored to your organization's unique needs",
      items: [
        {
          name: "Retained Search",
          description: "Dedicated search process for senior executive positions with guaranteed results",
          features: ["Comprehensive market mapping", "Detailed candidate assessment", "90-day guarantee"],
        },
        {
          name: "Exclusive Search Services",
          description: "Premium exclusive search for C-level and board positions",
          features: ["Executive-level confidentiality", "Global talent network", "Strategic consultation"],
        },
        {
          name: "Non Exclusive Search Services",
          description: "Flexible search solutions for mid to senior-level positions",
          features: ["Cost-effective approach", "Faster turnaround time", "Quality assurance"],
        },
      ],
    },
    {
      title: 		"Assessment Center-based Search (HITAC)	",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Professional development workshops designed to enhance individual and team performance",
      items: [
        {
          name: "Reduced Turnover",
          description: "Indentifies talents who are culture-fit for the organization",
          features: ["Prioritizing Culture & Role fit", "Using Structured Assessment and realistic Job Preview	", "Identifying talents with Growth potential"],
        },
        {
          name: "Enhanced Performance	",
          description: "Ensuring High Potential talents who takes less gestation period and deliver performance",
          features: ["Identifying talents with learning agility", "Evaluation of Leadership Traits", "Assessing Ownership, Drive and Proactive behaviour"],
        },
        {
          name: "Organizational Growth",
          description: "Finding Talents who are aligned with strategic goal of the organization",
          features: ["Evaluating business acument and strategic thinking", "Testing ability to Prioratize and execute with Clarity", "Assessing talent's Change readiness"],
        },
      ],
    },
    {
      title: "Human Resources Consulting",
      icon: <Building className="w-8 h-8" />,
      description: "Strategic HR consulting services to transform your organization and people",
      items: [
        {
          name: "Building Organization Transformation",
          description: "Comprehensive organizational change management and strategic restructuring",
          features: ["Change management", "Process optimization", "Strategic alignment"],
        },
        {
          name: "Building People Transformation",
          description: "Develop your workforce capabilities and leadership pipeline",
          features: ["Leadership development", "Talent management", "Succession planning"],
        },
        {
          name: "Collateral Services",
          description: "Additional HR support services to complement your transformation journey",
          features: ["HR audits", "Policy development", "Compliance support"],
        },
      ],
    },
  ]

  return (<>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background ">
    <section className="w-full text-white relative overflow-hidden">
        <div className="relative w-full h-48 sm:h-64 md:h-80 bg-muted">
          <img 
            src="/banner.jpg" 
            alt="Services Banner" 
            className="w-full h-full object-contain sm:object-contain md:object-cover" 
            style={{ objectPosition: 'center center' }}
          />
        </div>
      </section>
        
      {/* Hero Section */}
      <section className=" py-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-accent/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Professional Services
            </div>
            <h1 className="font-red-hat-display text-3xl md:text-5xl font-bold text-primary mb-6">Our Services</h1>
            <p className="md:text-xl text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive leadership solutions designed to transform organizations and accelerate career excellence
              through our proven methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeService === index
                    ? "bg-accent text-accent-foreground shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }`}
              >
                {service.icon}
                <span className="font-medium">{service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Details */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-full text-accent">{services[activeService].icon}</div>
              <h2 className="font-red-hat-display text-2xl md:text-4xl lg:text-5xl font-bold text-accent">
                {services[activeService].title}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{services[activeService].description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services[activeService].items.map((item, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-red-hat-display text-xl font-bold text-primary">{item.name}</h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>

                <div className="space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <ChevronRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105" onClick={() => window.location.href = '/Contact'}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent dark:from-slate-800 dark:via-slate-700 dark:to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-4 bg-white/20 dark:bg-white/10 rounded-full inline-flex mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="font-red-hat-display text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Organization?</h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Let's discuss how our proven methodologies can help you find exceptional leaders and build high-performing
            teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/Contact" className="bg-white text-primary dark:text-[#1e293b] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors duration-300">
              Schedule Consultation
            </a>
            <button 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-primary dark:hover:text-[#1e293b] transition-colors duration-300 flex items-center gap-2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Ken%20McCoy%20Brochure%202026.pdf';
                link.download = 'Ken McCoy Consulting Brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={18} />
              Download Brochure
            </button>
          </div>
        </div>
      </section>

   
      <Footer />
    </div>
    </>
  )
}
