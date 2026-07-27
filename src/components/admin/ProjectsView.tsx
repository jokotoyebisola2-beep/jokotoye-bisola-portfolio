import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Archive,
  Eye,
  Star,
  CheckCircle,
  ExternalLink,
  Save,
  Image,
  X,
  Sparkles,
  ArrowLeft,
  Upload
} from 'lucide-react';
import { cmsService } from '../../lib/cmsService';
import { Project, ProjectStatus } from '../../types';

export const ProjectsView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form / Editor state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [previewingProject, setPreviewingProject] = useState<Project | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Toast / Error state
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorAlert(msg);
  };

  useEffect(() => {
    setLoading(true);
    const unsub = cmsService.subscribeProjects(
      (data) => {
        setProjects(data);
        setLoading(false);
        setFetchError(null);
      },
      (err) => {
        setLoading(false);
        setFetchError(err instanceof Error ? err.message : 'Failed to fetch projects from Firestore.');
      }
    );
    return unsub;
  }, []);

  // Check URL params for action=new or edit=ID
  useEffect(() => {
    const action = searchParams.get('action');
    const editId = searchParams.get('edit');

    if (action === 'new') {
      handleCreateNew();
      searchParams.delete('action');
      setSearchParams(searchParams);
    } else if (editId) {
      const proj = projects.find(p => p.id === editId);
      if (proj) {
        setEditingProject({ ...proj });
      }
    }
  }, [searchParams, projects]);

  const handleCreateNew = () => {
    setErrorAlert(null);
    setEditingProject({
      title: '',
      slug: '',
      category: 'ai-fintech',
      subtitle: '',
      challenge: '',
      solution: '',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      liveDemoUrl: '',
      githubUrl: '',
      completionDate: '2025',
      clientName: '',
      status: 'draft',
      featured: false,
    });
  };

  const handleSave = async (statusOverride?: ProjectStatus) => {
    if (!editingProject || !editingProject.title) return;

    setErrorAlert(null);
    setIsSaving(true);
    const statusToSave = statusOverride || editingProject.status || 'draft';
    const updated = {
      ...editingProject,
      status: statusToSave,
    };

    try {
      setAutoSaveStatus('Saving...');
      const savedId = await cmsService.saveProject(updated);
      setAutoSaveStatus('✓ Saved just now');
      setTimeout(() => setAutoSaveStatus(''), 3000);
      setEditingProject(null);
      searchParams.delete('edit');
      setSearchParams(searchParams);
      showSuccess(`Project "${updated.title}" saved successfully to Firestore!`);
    } catch (err) {
      console.error('Failed to save project:', err);
      setAutoSaveStatus('Error saving');
      showError(`Firestore rejected write: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setErrorAlert(null);
      try {
        await cmsService.deleteProject(id);
        showSuccess('Project deleted successfully from Firestore.');
      } catch (err) {
        showError(`Firestore delete failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  const handleDuplicate = async (proj: Project) => {
    setErrorAlert(null);
    try {
      const duplicated: Partial<Project> = {
        ...proj,
        id: `proj_${Date.now()}`,
        title: `${proj.title} (Copy)`,
        slug: `${proj.slug}-copy`,
        status: 'draft',
      };
      await cmsService.saveProject(duplicated);
      showSuccess(`Duplicated "${proj.title}" saved to Firestore.`);
    } catch (err) {
      showError(`Failed to duplicate project: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleArchive = async (proj: Project) => {
    setErrorAlert(null);
    try {
      const newStatus = proj.status === 'archived' ? 'draft' : 'archived';
      await cmsService.saveProject({
        ...proj,
        status: newStatus,
      });
      showSuccess(`Project status updated to ${newStatus} in Firestore.`);
    } catch (err) {
      showError(`Failed to update status: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim() || !editingProject) return;
    const currentTechs = editingProject.technologies || [];
    if (!currentTechs.includes(techInput.trim())) {
      setEditingProject({
        ...editingProject,
        technologies: [...currentTechs, techInput.trim()],
      });
    }
    setTechInput('');
  };

  const handleRemoveTech = (techToRemove: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: (editingProject.technologies || []).filter(t => t !== techToRemove),
    });
  };

  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim() || !editingProject) return;
    const current = editingProject.gallery || [];
    setEditingProject({
      ...editingProject,
      gallery: [...current, newGalleryUrl.trim()],
    });
    setNewGalleryUrl('');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">

      {/* Success Toast */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorAlert && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-medium flex items-center justify-between">
          <span>{errorAlert}</span>
          <button onClick={() => setErrorAlert(null)} className="text-red-400 hover:text-white text-xs font-bold ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Fetch Error Banner */}
      {fetchError && (
        <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-200 text-xs font-medium">
          <strong>Firestore Fetch Warning:</strong> {fetchError}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Project Management</h1>
          <p className="text-xs text-slate-400">
            Manage, publish, and draft case studies for Jokotoye Bisola's portfolio.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="preview">Preview</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">All Categories</option>
            <option value="ai-fintech">AI Solutions</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="saas">Web Apps</option>
            <option value="on-demand">On-Demand</option>
            <option value="interactive">Games</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image & Status Badge */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${
                      proj.status === 'published'
                        ? 'bg-emerald-950/90 border-emerald-800 text-emerald-400'
                        : proj.status === 'preview'
                        ? 'bg-amber-950/90 border-amber-800 text-amber-400'
                        : proj.status === 'draft'
                        ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                        : 'bg-slate-950/90 border-slate-800 text-slate-500'
                    }`}
                  >
                    {proj.status}
                  </span>
                  {proj.featured && (
                    <span className="bg-blue-600/90 border border-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="text-[11px] font-bold text-[#60A5FA] mb-1 uppercase tracking-wider">
                  {proj.industry}
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {proj.subtitle}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 3 && (
                    <span className="text-[10px] text-slate-500">
                      +{proj.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingProject({ ...proj })}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewingProject(proj)}
                  className="p-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Live Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDuplicate(proj)}
                  className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Duplicate Project"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleArchive(proj)}
                  className="p-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title={proj.status === 'archived' ? 'Unarchive' : 'Archive'}
                >
                  <Archive className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => handleDelete(proj.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Drawer / Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto p-4 sm:p-6 lg:p-10 flex justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-xl font-extrabold text-white">
                    {editingProject.id ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  {autoSaveStatus && (
                    <span className="text-xs text-emerald-400 font-semibold">{autoSaveStatus}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSave('draft')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave('published')}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold cursor-pointer"
                >
                  Publish
                </button>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingProject({ ...editingProject, title, slug });
                  }}
                  placeholder="e.g. Aura Finance"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  placeholder="aura-finance"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Industry / Category</label>
                <select
                  value={editingProject.category || 'ai-fintech'}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="ai-fintech">AI Solutions</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="saas">Web Applications</option>
                  <option value="on-demand">On-Demand</option>
                  <option value="interactive">Games & Interactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Client Name (Optional)</label>
                <input
                  type="text"
                  value={editingProject.clientName || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                  placeholder="FinPulse Capital"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  placeholder="Automated cashflow tracking and fraud warnings for finance teams."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Challenge & Problem</label>
                <textarea
                  rows={2}
                  value={editingProject.challenge || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                  placeholder="What problem did the client face?"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Solution Provided</label>
                <textarea
                  rows={2}
                  value={editingProject.solution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  placeholder="How did you solve it using web & AI technology?"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              {/* Cover Image & Gallery */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-400">Cover Image URL</label>
                <input
                  type="text"
                  value={editingProject.image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              {/* Technologies */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-400">Technologies Used</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology (e.g. Next.js, Gemini AI)..."
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(editingProject.technologies || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(t)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={editingProject.liveDemoUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                  placeholder="https://example.demo"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={editingProject.githubUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              {/* Status & Featured */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Status</label>
                  <select
                    value={editingProject.status || 'draft'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                  >
                    <option value="draft">Draft</option>
                    <option value="preview">Preview</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-[#2563EB]"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-white">
                    Feature on Homepage
                  </label>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewingProject && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-[#111827] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setPreviewingProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 overflow-hidden bg-slate-100 relative">
              <img
                src={previewingProject.image}
                alt={previewingProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 space-y-4">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                {previewingProject.industry}
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">
                {previewingProject.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {previewingProject.subtitle}
              </p>

              {previewingProject.solution && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold block text-slate-900 mb-1">Solution:</span>
                  {previewingProject.solution}
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                {previewingProject.liveDemoUrl && (
                  <a
                    href={previewingProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold flex items-center gap-2"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
