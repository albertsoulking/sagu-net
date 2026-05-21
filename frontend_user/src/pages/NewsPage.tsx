import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations'
import { cn } from '@/lib/utils'
import { news } from '@/data'

const categories = ['All', ...new Set(news.map((item) => item.category))]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const categoryColors: Record<string, string> = {
  Expansion: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  Product: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  Community: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Achievement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Partnership: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = news.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = news[0]

  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-950 to-accent-500/10" />
        <div className="hero-glow bg-primary-500 top-[-200px] left-[-200px]" />
        <div className="hero-glow bg-accent-500 bottom-[-200px] right-[-200px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Latest <span className="gradient-text">News</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Stay updated with the latest from Sagu Net
          </motion.p>
        </div>
      </section>

      {/* Featured News */}
      {featured && (
        <section className="relative -mt-8 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-3xl overflow-hidden group"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium border',
                    categoryColors[featured.category] || 'bg-white/5 text-white/50',
                  )}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {featured.title}
                </h2>
                <p className="text-white/50 text-base md:text-lg mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                    activeCategory === cat
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="relative py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
            >
              <Tag className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No News Found</h3>
              <p className="text-white/50">Try adjusting your search or filter.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item) => (
                <motion.div
                  key={item.title + item.date}
                  variants={staggerItem}
                  className="glass rounded-2xl overflow-hidden group hover:border-primary-500/20 transition-all duration-300"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary-500/5 to-accent-500/5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                      <Tag className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={cn(
                        'px-2.5 py-0.5 rounded-full text-xs font-medium border',
                        categoryColors[item.category] || 'bg-white/5 text-white/50',
                      )}>
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-white/30 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                    <button className="flex items-center gap-1 text-primary-400 text-sm font-medium hover:text-accent-400 transition-colors">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
