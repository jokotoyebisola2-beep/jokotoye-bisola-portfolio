import React, { useState, useEffect } from 'react';
import { Mail, Check, Trash2, MessageSquare, Search, Eye, EyeOff, CheckCircle2, Send } from 'lucide-react';
import { cmsService } from '../../lib/cmsService';
import { Message } from '../../types';

export const MessagesView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = cmsService.subscribeMessages(
      (data) => {
        setMessages(data);
        setLoading(false);
        setFetchError(null);
      },
      (err) => {
        setLoading(false);
        setFetchError(err instanceof Error ? err.message : 'Failed to fetch messages from Firestore.');
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

  const handleSelectMessage = async (msg: Message) => {
    setSelectedMsg(msg);
    if (msg.status === 'unread') {
      try {
        await cmsService.updateMessageStatus(msg.id, 'read');
      } catch (err) {
        console.error('Failed to update message status:', err);
      }
    }
  };

  const handleToggleReadStatus = async (msg: Message, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = msg.status === 'read' ? 'unread' : 'read';
    try {
      await cmsService.updateMessageStatus(msg.id, newStatus);
      showToast(`Marked message as ${newStatus}`);
      if (selectedMsg?.id === msg.id) {
        setSelectedMsg({ ...selectedMsg, status: newStatus });
      }
    } catch (err) {
      showError(`Failed to update status: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await cmsService.deleteMessage(deleteConfirmId);
        if (selectedMsg?.id === deleteConfirmId) setSelectedMsg(null);
        showToast('Message deleted successfully from Firestore.');
        setDeleteConfirmId(null);
      } catch (err) {
        showError(`Firestore delete failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

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
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Messages & Inquiries</h1>
            {unreadCount > 0 && (
              <span className="bg-[#2563EB] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Inquiries submitted via the portfolio contact form.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setStatusFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setStatusFilter('read')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'read'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search name, email or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/80 border border-slate-800 rounded-2xl">
              <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">No messages found.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  selectedMsg?.id === msg.id
                    ? 'bg-blue-950/80 border-blue-600'
                    : msg.status === 'unread'
                    ? 'bg-slate-900 border-blue-900/60'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 truncate">
                    {msg.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 ml-2">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mb-1">{msg.email}</p>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{msg.message}</p>

                <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <button
                    onClick={(e) => handleToggleReadStatus(msg, e)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title={msg.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {msg.status === 'read' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Details */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 min-h-[380px] flex flex-col justify-between shadow-xl">
          {selectedMsg ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{selectedMsg.name}</h2>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        selectedMsg.status === 'read'
                          ? 'bg-slate-800 border-slate-700 text-slate-400'
                          : 'bg-blue-950 border-blue-800 text-blue-400'
                      }`}
                    >
                      {selectedMsg.status}
                    </span>
                  </div>
                  <a
                    href={`mailto:${selectedMsg.email}`}
                    className="text-xs text-[#60A5FA] font-semibold hover:underline block mt-0.5"
                  >
                    {selectedMsg.email}
                  </a>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Received: {new Date(selectedMsg.date).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleReadStatus(selectedMsg, e)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                    title="Toggle Read / Unread"
                  >
                    {selectedMsg.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(selectedMsg.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Inquiry Message
                </span>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-inner">
                  {selectedMsg.message}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3 justify-end">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: Portfolio Inquiry from ${selectedMsg.name}&body=Hi ${selectedMsg.name},%0D%0A%0D%0AThank you for reaching out through my portfolio website.%0D%0A%0D%0ARegards,%0D%0AJokotoye Bisola`}
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="m-auto text-center space-y-2 text-slate-500">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs font-medium">Select a message from the left to view full inquiry details.</p>
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Delete Message?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete this message inquiry? This action cannot be undone.
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
