import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  District,
  ProductCategory,
  Product,
  Farm,
  User,
  CartItem,
  MasterOrder,
  FarmSubOrder,
  OrderStatus,
  AuditLog,
  SmsNotification,
} from '../types';
import { translations, Translations } from '../data/translations';
import {
  INITIAL_USERS,
  INITIAL_FARMS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  activeRole: UserRole;
  activeUser: User;
  switchRole: (role: UserRole) => void;
  users: User[];
  toggleUserStatus: (userId: string) => void;
  farms: Farm[];
  verifyFarm: (farmId: string, status: boolean) => void;
  updateFarmProfile: (farmData: Partial<Farm>) => void;
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleProductStock: (productId: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotalLKR: number;
  cartFarmsCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: MasterOrder[];
  placeOrder: (data: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    district: District;
    postalCode: string;
    paymentMethod: MasterOrder['paymentMethod'];
  }) => string;
  updateSubOrderStatus: (
    subOrderId: string,
    newStatus: OrderStatus,
    farmerNotes?: string
  ) => void;
  auditLogs: AuditLog[];
  smsNotifications: SmsNotification[];
  dismissSms: (id: string) => void;
  clearAllSms: () => void;
  // UI states
  selectedDistrict: District | 'All';
  setSelectedDistrict: (d: District | 'All') => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (c: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isRoleSelectorOpen: boolean;
  setIsRoleSelectorOpen: (open: boolean) => void;
  selectedFarmModal: Farm | null;
  setSelectedFarmModal: (farm: Farm | null) => void;
  activeTab: 'marketplace' | 'farms' | 'customer_dashboard' | 'farmer_dashboard' | 'admin_dashboard' | 'owner_dashboard';
  setActiveTab: (tab: any) => void;
  resetDemoData: () => void;
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'sla_lang',
  ROLE: 'sla_role',
  USERS: 'sla_users',
  FARMS: 'sla_farms',
  PRODUCTS: 'sla_products',
  ORDERS: 'sla_orders',
  CART: 'sla_cart',
  WISHLIST: 'sla_wishlist',
  LOGS: 'sla_logs',
  SMS: 'sla_sms',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'ta' || saved === 'si' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const t = translations[language];

  // 2. Users & Active Role
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return saved === 'farmer' || saved === 'admin' || saved === 'owner' || saved === 'customer'
      ? saved
      : 'customer';
  });

  const activeUser = users.find((u) => u.role === activeRole) || users[0];

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    // Auto-navigate to appropriate view
    if (role === 'customer') setActiveTab('marketplace');
    else if (role === 'farmer') setActiveTab('farmer_dashboard');
    else if (role === 'admin') setActiveTab('admin_dashboard');
    else if (role === 'owner') setActiveTab('owner_dashboard');

    showToast(`Switched persona to: ${role.toUpperCase()}`, 'info');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? ('suspended' as const) : ('active' as const) } : u
      );
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
      return updated;
    });
    addAuditLog('USER_STATUS_CHANGE', `Toggled account status for user ${userId}`, 'warning');
  };

  // 3. Farms
  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FARMS);
    return saved ? JSON.parse(saved) : INITIAL_FARMS;
  });

  const verifyFarm = (farmId: string, status: boolean) => {
    setFarms((prev) => {
      const updated = prev.map((f) => (f.id === farmId ? { ...f, isVerified: status } : f));
      localStorage.setItem(STORAGE_KEYS.FARMS, JSON.stringify(updated));
      return updated;
    });
    const targetFarm = farms.find((f) => f.id === farmId);
    addAuditLog(
      'FARM_VERIFICATION_UPDATE',
      `Farm "${targetFarm?.name || farmId}" verification status set to ${status ? 'VERIFIED' : 'UNVERIFIED'}`,
      status ? 'success' : 'warning'
    );
    showToast(status ? 'Farm verified successfully!' : 'Farm verification removed.', 'info');
  };

  const updateFarmProfile = (farmData: Partial<Farm>) => {
    setFarms((prev) => {
      const updated = prev.map((f) => (f.id === farmData.id ? { ...f, ...farmData } : f));
      localStorage.setItem(STORAGE_KEYS.FARMS, JSON.stringify(updated));
      return updated;
    });
    showToast('Farm profile updated successfully!', 'success');
    addAuditLog('FARM_PROFILE_EDIT', `Updated details for ${farmData.name || 'farm'}`, 'info');
  };

  // 4. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => {
      const updated = [product, ...prev];
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
    showToast(`Added new listing: ${product.name}`, 'success');
    addAuditLog('PRODUCT_CREATED', `New crop added: ${product.name} (${product.district})`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => {
      const updatedList = prev.map((p) => (p.id === updated.id ? updated : p));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return updatedList;
    });
    showToast(`Updated listing: ${updated.name}`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
    showToast('Listing removed from marketplace', 'info');
    addAuditLog('PRODUCT_DELETED', `Product id ${productId} removed`, 'warning');
  };

  const toggleProductStock = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, inStock: !p.inStock, stockQuantity: !p.inStock ? 50 : 0 } : p
      );
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
  };

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalLKR = cart.reduce((sum, item) => sum + item.product.priceLKR * item.quantity, 0);
  const cartFarmsCount = new Set(cart.map((item) => item.product.farmId)).size;

  // 6. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-4'];
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
      showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
      return updated;
    });
  };

  // 7. Orders & Smart Multi-Farm Cart Splitting
  const [orders, setOrders] = useState<MasterOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  const [smsNotifications, setSmsNotifications] = useState<SmsNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SMS);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'sms-init-1',
            recipientPhone: '+94 71 884 9210',
            recipientName: 'K. Tharmalingam (Jaffna Heritage Agro)',
            role: 'farmer',
            message: 'AgriConnect Alert: New order SUB-ORD-9041-A received (2x Jaffna Red Shallots). Please confirm harvest!',
            timestamp: '2026-10-12 09:21',
            orderId: 'ORD-LK-2026-9041',
          },
        ];
  });

  const dismissSms = (id: string) => {
    setSmsNotifications((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SMS, JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllSms = () => {
    setSmsNotifications([]);
    localStorage.setItem(STORAGE_KEYS.SMS, JSON.stringify([]));
  };

  const placeOrder = (data: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    district: District;
    postalCode: string;
    paymentMethod: MasterOrder['paymentMethod'];
  }): string => {
    if (cart.length === 0) return '';

    // Smart Multi-Farm Cart Splitting logic:
    // 1. Group items by farmId
    const farmGroups: { [farmId: string]: CartItem[] } = {};
    cart.forEach((item) => {
      const fid = item.product.farmId;
      if (!farmGroups[fid]) farmGroups[fid] = [];
      farmGroups[fid].push(item);
    });

    const masterOrderId = `ORD-LK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const createdSubOrders: FarmSubOrder[] = [];
    const createdSmsList: SmsNotification[] = [];

    let totalSubtotal = 0;
    let totalDelivery = 0;

    Object.entries(farmGroups).forEach(([farmId, groupItems], index) => {
      const firstItem = groupItems[0].product;
      const farm = farms.find((f) => f.id === farmId);
      const subOrderId = `SUB-${masterOrderId.replace('ORD-LK-2026-', '')}-${String.fromCharCode(65 + index)}`;

      const subtotalLKR = groupItems.reduce(
        (sum, it) => sum + it.product.priceLKR * it.quantity,
        0
      );
      // Flat 250 LKR logistics fee per farm delivery
      const deliveryFeeLKR = 250;
      const subtotalPlusDelivery = subtotalLKR + deliveryFeeLKR;

      totalSubtotal += subtotalLKR;
      totalDelivery += deliveryFeeLKR;

      const subOrder: FarmSubOrder = {
        id: subOrderId,
        masterOrderId,
        farmId,
        farmName: farm?.name || firstItem.farmName,
        farmerId: farm?.farmerId || firstItem.farmerId,
        farmerName: farm?.farmerName || firstItem.farmerName,
        farmerPhone: farm?.phone || '+94 77 000 0000',
        items: groupItems.map((gi) => ({
          productId: gi.product.id,
          productName: gi.product.name,
          priceLKR: gi.product.priceLKR,
          quantity: gi.quantity,
          unit: gi.product.unit,
          imageUrl: gi.product.imageUrl,
        })),
        subtotalLKR,
        deliveryFeeLKR,
        totalLKR: subtotalPlusDelivery,
        status: 'Pending',
        updatedAt: nowIso,
        farmerNotes: 'Freshly placed by customer. Awaiting harvest and dispatch confirmation.',
      };

      createdSubOrders.push(subOrder);

      // Trigger Simulated SMS to Farmer
      const smsToFarmer: SmsNotification = {
        id: `sms-${Date.now()}-${farmId}`,
        recipientPhone: subOrder.farmerPhone,
        recipientName: `${subOrder.farmerName} (${subOrder.farmName})`,
        role: 'farmer',
        message: `AgriConnect Alert: New incoming order #${subOrderId} for ${groupItems.length} harvest items (LKR ${subtotalLKR.toLocaleString()}). Deliver to ${data.district}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orderId: masterOrderId,
      };
      createdSmsList.push(smsToFarmer);
    });

    const masterOrder: MasterOrder = {
      id: masterOrderId,
      customerId: activeUser.id,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      deliveryAddress: data.address,
      district: data.district,
      postalCode: data.postalCode,
      paymentMethod: data.paymentMethod,
      status: 'Pending',
      subtotalLKR: totalSubtotal,
      deliveryFeeLKR: totalDelivery,
      totalLKR: totalSubtotal + totalDelivery,
      createdAt: nowIso,
      subOrders: createdSubOrders,
    };

    setOrders((prev) => [masterOrder, ...prev]);

    setSmsNotifications((prev) => {
      const updated = [...createdSmsList, ...prev];
      localStorage.setItem(STORAGE_KEYS.SMS, JSON.stringify(updated));
      return updated;
    });

    clearCart();

    addAuditLog(
      'ORDER_PLACED_AND_SPLIT',
      `Master Order ${masterOrderId} split into ${createdSubOrders.length} farm sub-orders for ${data.fullName}`,
      'success'
    );

    showToast(
      `Order placed! Split across ${createdSubOrders.length} farm(s). SMS alerts sent to farmers.`,
      'success'
    );

    return masterOrderId;
  };

  const updateSubOrderStatus = (
    subOrderId: string,
    newStatus: OrderStatus,
    farmerNotes?: string
  ) => {
    setOrders((prevOrders) => {
      return prevOrders.map((master) => {
        const containsSub = master.subOrders.some((s) => s.id === subOrderId);
        if (!containsSub) return master;

        const updatedSubs = master.subOrders.map((sub) => {
          if (sub.id === subOrderId) {
            return {
              ...sub,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              farmerNotes: farmerNotes || sub.farmerNotes,
            };
          }
          return sub;
        });

        // Compute master status
        const allDelivered = updatedSubs.every((s) => s.status === 'Delivered');
        const allCancelled = updatedSubs.every((s) => s.status === 'Cancelled');
        const anyShipped = updatedSubs.some((s) => s.status === 'Shipped');
        const anyProcessing = updatedSubs.some((s) => s.status === 'Processing');

        let newMasterStatus: OrderStatus = master.status;
        if (allDelivered) newMasterStatus = 'Delivered';
        else if (allCancelled) newMasterStatus = 'Cancelled';
        else if (anyShipped) newMasterStatus = 'Shipped';
        else if (anyProcessing) newMasterStatus = 'Processing';

        return {
          ...master,
          status: newMasterStatus,
          subOrders: updatedSubs,
        };
      });
    });

    // Simulated SMS alert to customer
    const targetSub = orders
      .flatMap((m) => m.subOrders)
      .find((s) => s.id === subOrderId);

    if (targetSub) {
      const customerSms: SmsNotification = {
        id: `sms-cust-${Date.now()}`,
        recipientPhone: '+94 77 123 4567',
        recipientName: 'Customer (Dilshan Perera)',
        role: 'customer',
        message: `AgriConnect: Your items from "${targetSub.farmName}" have been updated to [${newStatus}].`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orderId: targetSub.masterOrderId,
      };

      setSmsNotifications((prev) => [customerSms, ...prev]);
    }

    addAuditLog(
      'SUBORDER_STATUS_UPDATE',
      `Sub-order ${subOrderId} status transitioned to ${newStatus}`,
      'info'
    );

    showToast(`Order status updated to ${newStatus}`, 'success');
  };

  // 8. Audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const addAuditLog = (
    action: string,
    details: string,
    level: 'info' | 'success' | 'warning' | 'alert'
  ) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      action,
      user: activeUser.name,
      role: activeRole,
      details,
      level,
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 49)];
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
      return updated;
    });
  };

  // 9. Toast messaging
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info' | 'warning';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((cur) => (cur?.text === text ? null : cur));
    }, 4000);
  };

  // 10. Filter & UI States
  const [selectedDistrict, setSelectedDistrict] = useState<District | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState<boolean>(false);
  const [selectedFarmModal, setSelectedFarmModal] = useState<Farm | null>(null);
  const [activeTab, setActiveTab] = useState<
    'marketplace' | 'farms' | 'customer_dashboard' | 'farmer_dashboard' | 'admin_dashboard' | 'owner_dashboard'
  >('marketplace');

  // Reset Demo
  const resetDemoData = () => {
    localStorage.clear();
    setLanguageState('en');
    setActiveRole('customer');
    setUsers(INITIAL_USERS);
    setFarms(INITIAL_FARMS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist(['prod-2', 'prod-4']);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSmsNotifications([]);
    setActiveTab('marketplace');
    showToast('Demo data reset to pristine state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeRole,
        activeUser,
        switchRole,
        users,
        toggleUserStatus,
        farms,
        verifyFarm,
        updateFarmProfile,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotalLKR,
        cartFarmsCount,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        updateSubOrderStatus,
        auditLogs,
        smsNotifications,
        dismissSms,
        clearAllSms,
        selectedDistrict,
        setSelectedDistrict,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isRoleSelectorOpen,
        setIsRoleSelectorOpen,
        selectedFarmModal,
        setSelectedFarmModal,
        activeTab,
        setActiveTab,
        resetDemoData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
