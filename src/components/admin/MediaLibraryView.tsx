import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Search, Copy, Check, Folder, Eye, Plus, Link as LinkIcon, X, CheckCircle2 } from 'lucide-react';
import { cmsService } from '../../lib/cmsService';
import { MediaItem, MediaFolder } from '../../types';

export const MediaLibraryView: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [showAddUrlModal, setShowAddUrlModal] = useState(false);
  const [urlForm, setUrlForm] = useState({ name: '', url: '', folder: 'Projects' as MediaFolder });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = cmsService.subscribeMediaItems(
      (data) => {
        setItems(data);
        setLoading(false);
        setFetchError(null);
      },
      (err) => {
        setLoading(false);
        setFetchError(err instanceof Error ? err.message : 'Failed to fetch media items from Firestore.');
      }
    );
    return unsub;
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const folderToUse: MediaFolder = (selectedFolder !== 'all' ? selectedFolder : 'Projects') as MediaFolder;
        await cmsService.uploadMedia(dataUrl, file.name, folderToUse);
        showToast('Image uploaded to Firestore Media Library!');
      } catch (err) {
        showError(`Firestore upload failed: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddExternalUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlForm.name || !urlForm.url) return;
    setErrorMessage(null);
    try {
      await cmsService.uploadMedia(urlForm.url, urlForm.name, urlForm.folder);
      setShowAddUrlModal(false);
      setUrlForm({ name: '', url: '', folder: 'Projects' });
      showToast('External image saved to Firestore Media Library!');
    } catch (err) {
      showError(`Firestore write failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      setErrorMessage(null);
      try {
        await cmsService.deleteMedia(deleteConfirmId);
        if (previewItem?.id === deleteConfirmId) setPreviewItem(null);
        showToast('Media item deleted from Firestore.');
        setDeleteConfirmId(null);
      } catch (err) {
        showError(`Firestore delete failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  const folders: MediaFolder[] = ['Projects', 'Profile', 'Logo', 'Services', 'Reviews'];

  const filteredItems = items.filter((item) => {
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-medium flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white text-xs font-bold ml-4">
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
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Media Library</h1>
          <p className="text-xs text-slate-400">
            Upload, manage, and reuse images across Jokotoye Bisola's portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddUrlModal(true)}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Add via URL</span>
          </button>

          <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-md cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filters & Folders */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFolder('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedFolder === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Media ({items.length})
          </button>
          {folders.map((f) => {
            const count = items.filter((i) => i.folder === f).length;
            return (
              <button
                key={f}
                onClick={() => setSelectedFolder(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedFolder === f
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>{f}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
          <ImageIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
          <p className="text-xs font-semibold">No media items found in this view.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group flex flex-col justify-between shadow-md"
            >
              <div
                onClick={() => setPreviewItem(item)}
                className="relative h-32 bg-slate-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 text-[9px] font-bold bg-slate-950/80 backdrop-blur-md text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                  {item.folder}
                </span>
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="p-3">
                <p className="text-[11px] font-bold text-white truncate mb-2" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="text-[10px] font-bold text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied!' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Lightbox */}
      {previewItem && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">{previewItem.name}</h3>
                <span className="text-[10px] text-blue-400 font-bold uppercase">{previewItem.folder}</span>
              </div>
              <button onClick={() => setPreviewItem(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-2 border border-slate-800 flex items-center justify-center max-h-[360px] overflow-hidden">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-h-[340px] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <input
                type="text"
                readOnly
                value={previewItem.url}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 mr-2 font-mono"
              />
              <button
                onClick={() => handleCopyUrl(previewItem.url, previewItem.id)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add via External URL Modal */}
      {showAddUrlModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddExternalUrl} className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Add Image via External URL</h3>
              <button type="button" onClick={() => setShowAddUrlModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Image Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Hero Banner, Client Logo, etc."
                  value={urlForm.name}
                  onChange={(e) => setUrlForm({ ...urlForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Image Direct URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={urlForm.url}
                  onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category / Folder</label>
                <select
                  value={urlForm.folder}
                  onChange={(e) => setUrlForm({ ...urlForm, folder: e.target.value as MediaFolder })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                >
                  {folders.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddUrlModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Add Image
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Delete Image?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete this image from your Media Library?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
