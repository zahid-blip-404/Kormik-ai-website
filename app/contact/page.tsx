'use client'

import { useState } from 'react'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [contractorForm, setContractorForm] = useState({
    name: '',
    phone: '',
    zone: '',
    role: '',
  })
  const [enterpriseForm, setEnterpriseForm] = useState({
    org: '',
    name: '',
    email: '',
    message: '',
  })
  const [contractorSent, setContractorSent] = useState(false)
  const [enterpriseSent, setEnterpriseSent] = useState(false)

  return (
    <InnerPageLayout
      showCTA={false}
      heroBadge="Contact"
      heroTitle="Get in"
      heroAccent="touch."
      heroSub="Whether you're a worker, contractor, or enterprise — we'd love to hear from you."
    >
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-4 md:px-8"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1A0800 0%, #0A0A0A 65%)',
        }}
      >
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mt-2 mb-6 max-w-[700px]">
            Let&apos;s build this{' '}
            <em className="text-brand not-italic">together.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed">
            Contractor waitlist, enterprise inquiry, or just want to know more —
            reach out below.
          </p>
        </div>
      </section>

      {/* Two forms */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contractor waitlist */}
          <div>
            <div className="bg-bg-2 border border-border rounded-xl p-6 md:p-8">
              <SectionLabel>Contractor Waitlist</SectionLabel>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Join as a Mukadam or Sangathan
              </h2>
              <p className="font-body text-sm text-text-secondary mb-6">
                Get early access to the platform in your zone.
              </p>

              {contractorSent ? (
                <div className="bg-success/10 border border-success/20 rounded-xl p-6 text-center">
                  <p className="font-body text-base text-success font-semibold">Thanks! We&apos;ll reach out to you soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setContractorSent(true) }}
                  className="space-y-4"
                >
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contractorForm.name}
                      onChange={(e) => setContractorForm({ ...contractorForm, name: e.target.value })}
                      placeholder="আপনার নাম"
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={contractorForm.phone}
                      onChange={(e) => setContractorForm({ ...contractorForm, phone: e.target.value })}
                      placeholder="+880 1X XX XXX XXX"
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Zone
                    </label>
                    <select
                      required
                      value={contractorForm.zone}
                      onChange={(e) => setContractorForm({ ...contractorForm, zone: e.target.value })}
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white focus:border-brand focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select zone</option>
                      <option value="mohammadpur">Mohammadpur</option>
                      <option value="adabor">Adabor</option>
                      <option value="mirpur">Mirpur</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Role
                    </label>
                    <select
                      required
                      value={contractorForm.role}
                      onChange={(e) => setContractorForm({ ...contractorForm, role: e.target.value })}
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white focus:border-brand focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select your role</option>
                      <option value="mukadam">Mukadam (Community mobiliser)</option>
                      <option value="sangathan">Sangathan (Licensed contractor)</option>
                    </select>
                  </div>
                  <Button variant="primary" size="md" type="submit" className="w-full justify-center mt-2">
                    Join Waitlist
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Enterprise inquiry */}
          <div>
            <div className="bg-bg-2 border border-border rounded-xl p-6 md:p-8">
              <SectionLabel>Enterprise Inquiry</SectionLabel>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                NGOs, Government & Enterprise
              </h2>
              <p className="font-body text-sm text-text-secondary mb-6">
                Large workforce? Custom requirements? Let&apos;s talk.
              </p>

              {enterpriseSent ? (
                <div className="bg-success/10 border border-success/20 rounded-xl p-6 text-center">
                  <p className="font-body text-base text-success font-semibold">
                    Thanks! Our enterprise team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setEnterpriseSent(true) }}
                  className="space-y-4"
                >
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={enterpriseForm.org}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, org: e.target.value })}
                      placeholder="Organization name"
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enterpriseForm.name}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={enterpriseForm.email}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, email: e.target.value })}
                      placeholder="you@organization.org"
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={enterpriseForm.message}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, message: e.target.value })}
                      placeholder="Tell us about your workforce needs..."
                      className="w-full bg-bg border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <Button variant="ghost" size="md" type="submit" className="w-full justify-center mt-2">
                    Send Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Direct contact */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: '#' },
              { icon: Mail, label: 'Email', value: 'hello@kormik.com.bd', href: 'mailto:hello@kormik.com.bd' },
              { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh', href: '#' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 bg-bg-2 border border-border rounded-xl p-5 hover:border-brand/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-bg-3 border border-border flex items-center justify-center shrink-0 group-hover:border-brand/40 transition-colors">
                    <Icon className="w-4 h-4 text-text-secondary group-hover:text-brand transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{item.label}</div>
                    <div className="font-body text-sm text-white mt-0.5">{item.value}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
