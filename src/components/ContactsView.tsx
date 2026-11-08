import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Contact } from '../types/crm';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building2, 
  Calendar 
} from 'lucide-react';

interface ContactsViewProps {
  contacts: Contact[];
  onOpenNewContactModal: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contacts,
  onOpenNewContactModal,
}) => {
  const { t, formatDate } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.contacts.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.contacts.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenNewContactModal}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.contacts.addContact}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={t.contacts.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder-slate-400"
        />
      </div>

      {/* Contacts High-Density Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4 font-semibold">{t.contacts.contactName}</th>
              <th className="py-3 px-4 font-semibold">{t.contacts.role}</th>
              <th className="py-3 px-4 font-semibold">{t.contacts.company}</th>
              <th className="py-3 px-4 font-semibold">{t.contacts.email}</th>
              <th className="py-3 px-4 font-semibold">{t.contacts.phone}</th>
              <th className="py-3 px-4 font-semibold">{t.contacts.lastContact}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                  No contacts found matching your query.
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                        {contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div>{contact.name}</div>
                        {contact.isPrimary && (
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                            Primary Decision Maker
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <div>{contact.title}</div>
                    <div className="text-[11px] text-slate-400">{contact.department}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contact.accountName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{contact.email}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-mono text-[11px]"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contact.phone}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(contact.lastContactDate)}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
