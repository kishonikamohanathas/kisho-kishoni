export type Language = 'en' | 'ta' | 'si';

export type UserRole = 'customer' | 'farmer' | 'admin' | 'owner';

export type District =
  | 'Jaffna'
  | 'Kandy'
  | 'Nuwara Eliya'
  | 'Anuradhapura'
  | 'Badulla'
  | 'Kilinochchi'
  | 'Kurunegala'
  | 'Matale';

export type ProductCategory =
  | 'Vegetables'
  | 'Fruits'
  | 'Rice'
  | 'Tea'
  | 'Spices'
  | 'Dairy';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district: District;
  phone: string;
  avatarUrl: string;
  farmId?: string;
  status: 'active' | 'suspended';
  joinedDate: string;
}

export interface Farm {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  nameTa: string;
  nameSi: string;
  district: District;
  location: string;
  establishedYear: number;
  isVerified: boolean;
  rating: number;
  totalSalesLKR: number;
  phone: string;
  description: string;
  imageUrl: string;
  certifications: string[]; // e.g. "SL-GAP", "100% Organic", "Ceylon Spice Board"
  acres: number;
}

export interface Product {
  id: string;
  farmId: string;
  farmName: string;
  farmerId: string;
  farmerName: string;
  name: string;
  nameTa: string;
  nameSi: string;
  category: ProductCategory;
  priceLKR: number;
  unit: string; // e.g. "kg", "500g", "pack", "pot", "100g"
  stockQuantity: number;
  inStock: boolean;
  district: District;
  imageUrl: string;
  isOrganic: boolean;
  isSlGapCertified: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  harvestDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  priceLKR: number;
  quantity: number;
  unit: string;
  imageUrl: string;
}

export interface FarmSubOrder {
  id: string;
  masterOrderId: string;
  farmId: string;
  farmName: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  items: OrderItem[];
  subtotalLKR: number;
  deliveryFeeLKR: number;
  totalLKR: number;
  status: OrderStatus;
  updatedAt: string;
  farmerNotes?: string;
}

export interface MasterOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  district: District;
  postalCode: string;
  paymentMethod: 'Cash on Delivery' | 'Bank Transfer (FriMi / Genie)' | 'Credit / Debit Card';
  status: OrderStatus;
  subtotalLKR: number;
  deliveryFeeLKR: number;
  totalLKR: number;
  createdAt: string;
  subOrders: FarmSubOrder[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: UserRole;
  details: string;
  level: 'info' | 'success' | 'warning' | 'alert';
}

export interface SmsNotification {
  id: string;
  recipientPhone: string;
  recipientName: string;
  role: 'farmer' | 'customer';
  message: string;
  timestamp: string;
  orderId: string;
}
