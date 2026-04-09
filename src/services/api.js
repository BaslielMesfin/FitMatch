/**
 * FitMatch — API Client Service
 * Centralized API communication layer.
 * 
 * SOLID Interface Segregation:
 * Split into focused modules (discovery, chat, search)
 * so components only import what they need.
 */

import { supabase } from '../lib/supabase'

const API_BASE = 'http://127.0.0.1:8000/api'

async function request(endpoint, options = {}) {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token

  const url = `${API_BASE}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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

  async likeItem(itemId, liked = true, itemObj = null) {
    return request('/discovery/like', {
      method: 'POST',
      body: JSON.stringify({ 
        item_id: itemId, 
        liked,
        aesthetic_tags: itemObj ? itemObj.aesthetic_tags || [] : [],
        brand: itemObj ? itemObj.brand : null
      }),
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

// ---- Boards API ----

function mapBoard(b) {
  return {
    id: b.id,
    name: b.name,
    description: b.description,
    itemCount: b.item_count ?? 0,
    coverImages: b.cover_images ?? [],
  }
}

export const boardsApi = {
  async getBoards() {
    const boards = await request('/boards/')
    return boards.map(mapBoard)
  },

  async createBoard(name, description = '') {
    const board = await request('/boards/', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    })
    return mapBoard(board)
  },

  async getBoardItems(boardId, page = 1, limit = 20) {
    return request(`/boards/${boardId}/items?page=${page}&limit=${limit}`)
  },

  async addItemToBoard(boardId, item) {
    return request(`/boards/${boardId}/items`, {
      method: 'POST',
      body: JSON.stringify({ item }),
    })
  },

  async removeItemFromBoard(boardId, itemId) {
    return request(`/boards/${boardId}/items/${itemId}`, {
      method: 'DELETE',
    })
  },
}

// ---- Social API ----

export const socialApi = {
  async toggleFollow(targetUserId, follow = true) {
    return request('/social/follow', {
      method: 'POST',
      body: JSON.stringify({ target_user_id: targetUserId, follow }),
    })
  },

  async getTrending(limit = 5) {
    return request(`/social/trending?limit=${limit}`)
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
