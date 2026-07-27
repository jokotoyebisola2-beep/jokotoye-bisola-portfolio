import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Eye, MessageSquare, FolderKanban, Github } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/portfolioData';
import { Project } from '../types';
import { cmsService } from '../lib/cmsService';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenBooking?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const unsub = cmsService.subscribeProjects(
      (data) => {
        if (!isMounted) return;
        // Strictly filter ONLY published projects (drafts are never shown on public site)
        const published = data.filter((p) => p.status === 'published');
        setProjectsList(published);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching projects from Firestore:', err);
        if (isMounted) setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-fintech', label: 'AI Solutions' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'saas', label: 'Web Applications' },
    { id: 'on-demand', label: 'On-Demand' },
    { id: 'interactive', label: 'Games' },
  ];

  const filteredProjects = projectsList.filter(
    (project) => filterCategory === 'all' || project.category === filterCategory
  );

  return (
    <section id="work" className="py-20 bg-white text-[#111827] relative">
      <div id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            My Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            A selection of websites, web applications, and AI solutions built for client growth.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State: Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden animate-pulse p-4 space-y-4"
              >
                <div className="w-full h-48 bg-slate-200 rounded-xl"></div>
                <div className="h-5 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-slate-200 rounded-md w-16"></div>
                  <div className="h-6 bg-slate-200 rounded-md w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty State Placeholder */
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              No Published Projects Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {filterCategory !== 'all'
                ? `No published projects found in the selected category.`
                : `New projects are currently being prepared in the CMS. Check back soon or request a custom showcase!`}
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Discuss Your Custom Project</span>
            </a>
          </div>
        ) : (
          /* Dynamic Project Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const coverImg = project.image || (project as any).coverImageUrl || (project as any).coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
              const description = project.subtitle || (project as any).shortDescription || (project as any).description || '';
              const liveUrl = project.liveDemoUrl || (project as any).liveUrl;
              const github = project.githubUrl;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={coverImg}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {(project.industry || project.category) && (
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#2563EB] shadow-2xs uppercase tracking-wider">
                          {project.industry || project.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0F172A] mb-1.5 group-hover:text-[#2563EB] transition-colors">
                        {project.title}
                      </h3>

                      {description && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                          {description}
                        </p>
                      )}

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(project.technologies || []).slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600 border border-slate-200/80"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.technologies || []).length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-[11px] font-medium text-slate-400">
                            +{(project.technologies || []).length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Project Callout */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Need a custom website, web app, or AI tool for your company?
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white shrink-0" />
            <span>💬 Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
