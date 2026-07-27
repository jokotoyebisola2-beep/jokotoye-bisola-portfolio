import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle, X } from 'lucide-react';
import { cmsService } from '../../lib/cmsService';
import { Service } from '../../types';

export const ServicesView: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Toast / Error state
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorAlert(msg);
  };

  useEffect(() => {
    setLoading(true);
    const unsub = cmsService.subscribeServices(
      (data) => {
        setServices(data);
        setLoading(false);
        setFetchError(null);
      },
      (err) => {
        setLoading(false);
        setFetchError(err instanceof Error ? err.message : 'Failed to fetch services from Firestore.');
      }
    );
    return unsub;
  }, []);

  const handleCreateNew = () => {
    setErrorAlert(null);
    setEditingService({
      title: '',
      description: '',
      iconName: 'Sparkles',
      status: 'active',
      order: services.length,
    });
  };

  const handleSave = async () => {
    if (!editingService || !editingService.title) return;
    setErrorAlert(null);
    setIsSaving(true);
    try {
      await cmsService.saveService(editingService);
      showSuccess(`Service "${editingService.title}" saved successfully to Firestore!`);
      setEditingService(null);
    } catch (err) {
      showError(`Firestore write failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setErrorAlert(null);
      try {
        await cmsService.deleteService(id);
        showSuccess('Service deleted successfully from Firestore.');
      } catch (err) {
        showError(`Firestore delete failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Services Management</h1>
          <p className="text-xs text-slate-400">
            Manage the core business services displayed on Jokotoye Bisola's website.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                  {srv.iconName}
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                    srv.status === 'active'
                      ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {srv.status}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white">{srv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingService({ ...srv })}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(srv.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Business Websites"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Modern websites that help turn visitors into customers."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Icon Name</label>
                  <select
                    value={editingService.iconName || 'Sparkles'}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="Sparkles">Sparkles (Websites)</option>
                    <option value="Cpu">Cpu (AI Solutions)</option>
                    <option value="Layers">Layers (Web Apps)</option>
                    <option value="Layout">Layout (UI/UX Design)</option>
                    <option value="Rocket">Rocket (SaaS)</option>
                    <option value="Workflow">Workflow (Automation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Status</label>
                  <select
                    value={editingService.status || 'active'}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
