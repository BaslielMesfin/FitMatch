/**
 * FitMatch — API Client Service
 * Centralized API communication layer.
 * 
 * SOLID Interface Segregation:
 * Split into focused modules (discovery, chat, search)
 * so components only import what they need.
 */

const API_BASE = 'http://localhost:8000/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error)
    throw error
  }
}

// ---- Discovery API ----

export const discoveryApi = {
  async getFeed({ aesthetic, brand, page = 1, limit = 20 } = {}) {
    const params = new URLSearchParams()
    if (aesthetic) params.set('aesthetic', aesthetic)
    if (brand) params.set('brand', brand)
    params.set('page', page)
    params.set('limit', limit)

    return request(`/discovery/feed?${params}`)
  },

  async likeItem(itemId, liked = true) {
    return request('/discovery/like', {
      method: 'POST',
      body: JSON.stringify({ item_id: itemId, liked }),
    })
  },

  async getTasteProfile() {
    return request('/discovery/taste-profile')
  },
}

// ---- Chat API ----

export const chatApi = {
  async sendMessage(message) {
    return request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
  },

  async uploadImage(file, message = 'What goes with this?') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('message', message)

    return request('/chat/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },
}

// ---- Search API ----

export const searchApi = {
  async search(query, { brands, maxPrice, aesthetic } = {}) {
    return request('/search/', {
      method: 'POST',
      body: JSON.stringify({
        query,
        brands: brands || null,
        max_price: maxPrice || null,
        aesthetic: aesthetic || null,
      }),
    })
  },

  async quickSearch(query, brand) {
    const params = new URLSearchParams({ q: query })
    if (brand) params.set('brand', brand)
    return request(`/search/quick?${params}`)
  },
}

// ---- Health ----

export async function checkApiHealth() {
  try {
    const data = await request('/health')
    return data
  } catch {
    return { status: 'offline' }
  }
}
