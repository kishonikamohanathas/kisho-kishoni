import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    marketplace: string;
    farms: string;
    customerDashboard: string;
    farmerPortal: string;
    adminConsole: string;
    ownerAnalytics: string;
    cart: string;
    wishlist: string;
    switchRole: string;
    loginAs: string;
    logout: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    exploreBtn: string;
    farmerJoinBtn: string;
    statsFarmers: string;
    statsDistricts: string;
    statsDirectTrade: string;
    statsOrganic: string;
  };
  marketplace: {
    searchPlaceholder: string;
    allDistricts: string;
    allCategories: string;
    filterByDistrict: string;
    filterByCategory: string;
    priceRange: string;
    organicOnly: string;
    verifiedOnly: string;
    inStockOnly: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortRating: string;
    productsFound: string;
    addToCart: string;
    addedToCart: string;
    outOfStock: string;
    organicBadge: string;
    slGapBadge: string;
    verifiedFarm: string;
    viewFarm: string;
    harvestedOn: string;
  };
  roles: {
    customer: string;
    farmer: string;
    admin: string;
    owner: string;
    customerDesc: string;
    farmerDesc: string;
    adminDesc: string;
    ownerDesc: string;
    selectRoleTitle: string;
    selectRoleSubtitle: string;
    activeRole: string;
    switchPrompt: string;
  };
  cart: {
    title: string;
    emptyCart: string;
    emptySubtitle: string;
    itemsFromFarms: string;
    subtotal: string;
    deliveryFee: string;
    multiFarmNotice: string;
    checkoutBtn: string;
    farmSplitNotice: string;
    remove: string;
    qty: string;
  };
  checkout: {
    title: string;
    deliveryDetails: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    district: string;
    postalCode: string;
    paymentMethod: string;
    cod: string;
    bankTransfer: string;
    card: string;
    placeOrderBtn: string;
    orderSuccess: string;
    orderSuccessSubtitle: string;
    multiOrderNotice: string;
  };
  orderStatus: {
    Pending: string;
    Confirmed: string;
    Processing: string;
    Shipped: string;
    Delivered: string;
    Cancelled: string;
  };
  farmerDashboard: {
    title: string;
    subtitle: string;
    farmProfile: string;
    inventory: string;
    incomingOrders: string;
    earnings: string;
    addProduct: string;
    editProduct: string;
    deleteProduct: string;
    grossSales: string;
    commissionFee: string;
    netPayout: string;
    totalOrders: string;
    updateStatus: string;
    stockToggle: string;
    priceLKR: string;
    unit: string;
    cropCategory: string;
  };
  adminDashboard: {
    title: string;
    subtitle: string;
    totalUsers: string;
    registeredFarmers: string;
    verifiedFarms: string;
    pendingApprovals: string;
    farmVerificationQueue: string;
    approve: string;
    reject: string;
    userManagement: string;
    suspendUser: string;
    activateUser: string;
    auditLogs: string;
    platformHealth: string;
  };
  ownerDashboard: {
    title: string;
    subtitle: string;
    gmvTitle: string;
    platformRevenue: string;
    activeFarms: string;
    topDistricts: string;
    salesByDistrict: string;
    monthlyGrowth: string;
    viewDbSchema: string;
    commissionRate: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Sri Lanka AgriConnect',
    tagline: 'Empowering Ceylon Agriculture Through Direct Digital Trade',
    nav: {
      marketplace: 'Marketplace',
      farms: 'Farm Directory',
      customerDashboard: 'My Orders',
      farmerPortal: 'Farmer Portal',
      adminConsole: 'Admin Console',
      ownerAnalytics: 'Owner Analytics',
      cart: 'Cart',
      wishlist: 'Wishlist',
      switchRole: 'Switch Role',
      loginAs: 'Role Selection',
      logout: 'Sign Out',
    },
    hero: {
      badge: 'Sri Lanka Digital Agriculture Initiative',
      title: 'Direct From Island Farms To Your Table',
      titleHighlight: 'Fair Trade & Fresh Harvests',
      subtitle:
        'Connect directly with verified farmers from Nuwara Eliya, Jaffna, Anuradhapura, Kandy, and beyond. Eliminating middlemen for higher farmer earnings and fresher produce.',
      exploreBtn: 'Browse Fresh Harvest',
      farmerJoinBtn: 'Farmer Dashboard',
      statsFarmers: '450+ Verified Farmers',
      statsDistricts: '8 Major Agricultural Districts',
      statsDirectTrade: '100% Direct Farmer Trade',
      statsOrganic: 'SL-GAP & Organic Certified',
    },
    marketplace: {
      searchPlaceholder: 'Search fresh tea, red onions, Suwandel rice, cinnamon...',
      allDistricts: 'All Districts',
      allCategories: 'All Categories',
      filterByDistrict: 'Filter by District',
      filterByCategory: 'Category',
      priceRange: 'Price Range',
      organicOnly: 'Organic Certified',
      verifiedOnly: 'Verified Farms Only',
      inStockOnly: 'In Stock Only',
      sortBy: 'Sort By',
      sortFeatured: 'Featured Harvests',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortRating: 'Highest Rated',
      productsFound: 'harvest items available',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to Cart',
      outOfStock: 'Temporarily Out of Stock',
      organicBadge: 'Organic',
      slGapBadge: 'SL-GAP Certified',
      verifiedFarm: 'Verified Producer',
      viewFarm: 'View Farm',
      harvestedOn: 'Harvested',
    },
    roles: {
      customer: 'Customer',
      farmer: 'Farmer / Producer',
      admin: 'Platform Admin',
      owner: 'Platform Owner',
      customerDesc: 'Browse authentic Ceylon produce, filter by district, checkout with multi-farm cart splitting.',
      farmerDesc: 'Manage your farm profile, adjust inventory and LKR pricing, and process incoming farm orders.',
      adminDesc: 'Moderate products, verify and approve new farm registrations, and inspect platform audit logs.',
      ownerDesc: 'Track Gross Merchandise Value (GMV), platform commission, regional district growth, and view DB schema.',
      selectRoleTitle: 'Select Your User Persona',
      selectRoleSubtitle: 'Switch seamlessly between personas to experience the complete Sri Lanka AgriConnect ecosystem.',
      activeRole: 'Active Mode',
      switchPrompt: 'Switch Role',
    },
    cart: {
      title: 'Shopping Cart',
      emptyCart: 'Your harvest cart is empty',
      emptySubtitle: 'Explore fresh produce from Sri Lankan farmers to start shopping.',
      itemsFromFarms: 'Farm Breakdown',
      subtotal: 'Produce Subtotal',
      deliveryFee: 'Island-wide Logistics',
      multiFarmNotice: 'Smart Multi-Farm Splitting Active',
      checkoutBtn: 'Proceed to Secure Checkout',
      farmSplitNotice: 'Items from different farms are automatically split into separate farm-specific fulfillment orders.',
      remove: 'Remove',
      qty: 'Qty',
    },
    checkout: {
      title: 'Checkout & Delivery',
      deliveryDetails: 'Delivery Information',
      fullName: 'Recipient Full Name',
      phoneNumber: 'Sri Lankan Mobile (+94)',
      email: 'Email Address',
      address: 'Street Address',
      district: 'Delivery District',
      postalCode: 'Postal Code',
      paymentMethod: 'Payment Method',
      cod: 'Cash on Delivery (Island-wide)',
      bankTransfer: 'Direct Bank Transfer / FriMi / Genie',
      card: 'Credit / Debit Card (Visa / Mastercard)',
      placeOrderBtn: 'Place Multi-Farm Order',
      orderSuccess: 'Order Successfully Placed!',
      orderSuccessSubtitle: 'Simulated SMS notifications have been dispatched to each farmer.',
      multiOrderNotice: 'Your order was split into separate farm sub-orders for direct fulfillment.',
    },
    orderStatus: {
      Pending: 'Pending',
      Confirmed: 'Confirmed',
      Processing: 'Processing',
      Shipped: 'In Transit / Shipped',
      Delivered: 'Delivered',
      Cancelled: 'Cancelled',
    },
    farmerDashboard: {
      title: 'Farmer Operations Center',
      subtitle: 'Manage your harvest listings, fulfill incoming orders, and track your net earnings.',
      farmProfile: 'Farm Profile',
      inventory: 'Harvest Inventory',
      incomingOrders: 'Incoming Orders',
      earnings: 'Earnings & Payouts',
      addProduct: 'Add New Crop Listing',
      editProduct: 'Edit Product',
      deleteProduct: 'Remove Listing',
      grossSales: 'Gross Farm Sales',
      commissionFee: 'Platform Fee (5%)',
      netPayout: 'Net Farmer Payout',
      totalOrders: 'Total Farm Orders',
      updateStatus: 'Update Order Status',
      stockToggle: 'In Stock',
      priceLKR: 'Price (LKR)',
      unit: 'Unit of Measure',
      cropCategory: 'Crop Category',
    },
    adminDashboard: {
      title: 'Administrative Control Console',
      subtitle: 'System moderation, farm compliance verification, and ecosystem security logs.',
      totalUsers: 'Total Users',
      registeredFarmers: 'Registered Farmers',
      verifiedFarms: 'Verified Farms',
      pendingApprovals: 'Pending Farm Approvals',
      farmVerificationQueue: 'Farm Verification Queue',
      approve: 'Verify & Approve',
      reject: 'Reject Listing',
      userManagement: 'User Status Management',
      suspendUser: 'Suspend',
      activateUser: 'Activate',
      auditLogs: 'System Security & Audit Trail',
      platformHealth: 'Platform Service Status: Healthy',
    },
    ownerDashboard: {
      title: 'Executive Business Intelligence',
      subtitle: 'High-level performance metrics, Gross Merchandise Value (GMV), and regional agricultural volume.',
      gmvTitle: 'Total GMV (Gross Merchandise Value)',
      platformRevenue: 'Platform Net Revenue (5% Take Rate)',
      activeFarms: 'Active Participating Farms',
      topDistricts: 'Top-Performing Agricultural Districts',
      salesByDistrict: 'Regional Sales Distribution',
      monthlyGrowth: 'Monthly Volume Growth',
      viewDbSchema: 'PostgreSQL / Supabase Schema',
      commissionRate: 'Commission Rate: 5.0%',
    },
  },
  ta: {
    appName: 'இலங்கை அக்ரிகனெக்ட்',
    tagline: 'நேரடி டிஜிட்டல் வர்த்தகம் மூலம் இலங்கை விவசாயத்தை வலுப்படுத்துதல்',
    nav: {
      marketplace: 'சந்தை',
      farms: 'பண்ணை பட்டியல்',
      customerDashboard: 'எனது ஆர்டர்கள்',
      farmerPortal: 'விவசாயி தளம்',
      adminConsole: 'நிர்வாக கன்சோல்',
      ownerAnalytics: 'உரிமையாளர் பகுப்பாய்வு',
      cart: 'கூடை',
      wishlist: 'விருப்பப்பட்டியல்',
      switchRole: 'பங்கு மாற்றம்',
      loginAs: 'பங்கு தேர்வு',
      logout: 'வெளியேறு',
    },
    hero: {
      badge: 'இலங்கை டிஜிட்டல் விவசாய முன்முயற்சி',
      title: 'தீவு பண்ணைகளிலிருந்து நேரடியாக உங்கள் இல்லத்திற்கு',
      titleHighlight: 'நியாயமான வர்த்தகம் & புதிய அறுவடை',
      subtitle:
        'நுவரெலியா, யாழ்ப்பாணம், அனுராதபுரம், கண்டி மற்றும் பல மாவட்ட விவசாயிகளுடன் நேரடியாக இணையுங்கள். இடைத்தரகர்கள் இன்றி கூடுதல் வருமானம்.',
      exploreBtn: 'புதிய விளைச்சல்களை காண்க',
      farmerJoinBtn: 'விவசாயி தளம்',
      statsFarmers: '450+ சான்றளிக்கப்பட்ட விவசாயிகள்',
      statsDistricts: '8 முக்கிய விவசாய மாவட்டங்கள்',
      statsDirectTrade: '100% நேரடி விவசாய வர்த்தகம்',
      statsOrganic: 'SL-GAP & இயற்கை சான்றிதழ்',
    },
    marketplace: {
      searchPlaceholder: 'தேயிலை, யாழ்ப்பாண சின்ன வெங்காயம், சுவந்தெல் அரிசி, கருவா...',
      allDistricts: 'அனைத்து மாவட்டங்கள்',
      allCategories: 'அனைத்து பிரிவுகள்',
      filterByDistrict: 'மாவட்டம் வாரியாக',
      filterByCategory: 'பிரிவு',
      priceRange: 'விலை வரம்பு',
      organicOnly: 'இயற்கை சான்றளிக்கப்பட்டது',
      verifiedOnly: 'சான்றளிக்கப்பட்ட பண்ணைகள் மட்டும்',
      inStockOnly: 'கையிருப்பில் உள்ளவை மட்டும்',
      sortBy: 'வரிசைப்படுத்து',
      sortFeatured: 'சிறப்பு அறுவடைகள்',
      sortPriceLow: 'விலை: குறைந்தது முதல் அதிகம்',
      sortPriceHigh: 'விலை: அதிகம் முதல் குறைந்தது',
      sortRating: 'உயர் மதிப்பீடு',
      productsFound: 'பொருட்கள் கிடைக்கின்றன',
      addToCart: 'கூடையில் சேர்',
      addedToCart: 'கூடையில் சேர்க்கப்பட்டது',
      outOfStock: 'தற்காலிகமாக முடிந்துவிட்டது',
      organicBadge: 'இயற்கை',
      slGapBadge: 'SL-GAP சான்றிதழ்',
      verifiedFarm: 'சரிபார்க்கப்பட்ட விவசாயி',
      viewFarm: 'பண்ணையை பார்',
      harvestedOn: 'அறுவடை நாள்',
    },
    roles: {
      customer: 'வாடிக்கையாளர்',
      farmer: 'விவசாயி / உற்பத்தியாளர்',
      admin: 'தள நிர்வாகி',
      owner: 'தள உரிமையாளர்',
      customerDesc: 'புதிய விளைபொருட்களை உலாவவும், மாவட்ட அடிப்படையில் வடிகட்டவும், பல பண்ணை ஆர்டர்களை இடவும்.',
      farmerDesc: 'உங்கள் பண்ணை சுயவிவரம், கையிருப்பு, LKR விலைகள் மற்றும் வரும் ஆர்டர்களை நிர்வகிக்கவும்.',
      adminDesc: 'விவசாய பதிவுகளை சரிபார்க்கவும், பயனர்களை கட்டுப்படுத்தவும், கணினி தணிக்கை பதிவுகளை பார்க்கவும்.',
      ownerDesc: 'மொத்த விற்பனை மதிப்பு (GMV), 5% தள வருவாய் மற்றும் மாவட்ட வளர்ச்சி அளவீடுகளை கண்காணிக்கவும்.',
      selectRoleTitle: 'உங்கள் பயனாளர் பாத்திரத்தை தேர்ந்தெடுக்கவும்',
      selectRoleSubtitle: 'முழுமையான விவசாய தளத்தை ஆராய எந்த பாத்திரத்திற்கும் மாறலாம்.',
      activeRole: 'செயலில் உள்ள பயன்முறை',
      switchPrompt: 'பங்கை மாற்று',
    },
    cart: {
      title: 'ஷாப்பிங் கூடை',
      emptyCart: 'உங்கள் கூடை காலியாக உள்ளது',
      emptySubtitle: 'இலங்கை விவசாயிகளின் புதிய விளைபொருட்களை ஆராயுங்கள்.',
      itemsFromFarms: 'பண்ணை விவரம்',
      subtotal: 'விளைபொருட்கள் மொத்தம்',
      deliveryFee: 'தீவு தழுவிய விநியோகம்',
      multiFarmNotice: 'பல பண்ணை பிரிப்பு செயலில் உள்ளது',
      checkoutBtn: 'செக்அவுட் தொடரவும்',
      farmSplitNotice: 'வெவ்வேறு பண்ணைகளின் பொருட்கள் தானாகவே தனித்தனி பண்ணை ஆர்டர்களாக பிரிக்கப்படும்.',
      remove: 'நீக்கு',
      qty: 'அளவு',
    },
    checkout: {
      title: 'செக்அவுட் மற்றும் விநியோகம்',
      deliveryDetails: 'விநியோக தகவல்',
      fullName: 'முழு பெயர்',
      phoneNumber: 'மொபைல் எண் (+94)',
      email: 'மின்னஞ்சல் முகவரி',
      address: 'முகவரி',
      district: 'விநியோக மாவட்டம்',
      postalCode: 'அஞ்சல் குறியீடு',
      paymentMethod: 'பணம் செலுத்தும் முறை',
      cod: 'பொருளைப் பெற்றதும் பணம் (COD)',
      bankTransfer: 'வங்கி பரிமாற்றம் / FriMi / Genie',
      card: 'வங்கி அட்டை (Visa / Mastercard)',
      placeOrderBtn: 'ஆர்டரை உறுதிசெய்',
      orderSuccess: 'ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
      orderSuccessSubtitle: 'ஒவ்வொரு விவசாயிக்கும் தானியங்கி SMS அறிவிப்பு அனுப்பப்பட்டது.',
      multiOrderNotice: 'உங்கள் ஆர்டர் நேரடி விநியோகத்திற்காக தனித்தனி பண்ணை ஆர்டர்களாக பிரிக்கப்பட்டுள்ளது.',
    },
    orderStatus: {
      Pending: 'நிலுவையில்',
      Confirmed: 'உறுதிசெய்யப்பட்டது',
      Processing: 'தயாராகிறது',
      Shipped: 'அனுப்பப்பட்டது',
      Delivered: 'வழங்கப்பட்டது',
      Cancelled: 'ரத்துசெய்யப்பட்டது',
    },
    farmerDashboard: {
      title: 'விவசாயி செயல்பாட்டு மையம்',
      subtitle: 'உங்கள் பயிர் பட்டியல்களை நிர்வகிக்கவும், ஆர்டர்களை நிறைவேற்றவும், நிகர வருவாயை கண்காணிக்கவும்.',
      farmProfile: 'பண்ணை சுயவிவரம்',
      inventory: 'பயிர் கையிருப்பு',
      incomingOrders: 'வந்த ஆர்டர்கள்',
      earnings: 'வருமானம் மற்றும் செலுத்துகைகள்',
      addProduct: 'புதிய பயிரைச் சேர்',
      editProduct: 'பொருளைத் திருத்து',
      deleteProduct: 'பட்டியலை நீக்கு',
      grossSales: 'மொத்த பண்ணை விற்பனை',
      commissionFee: 'தள கட்டணம் (5%)',
      netPayout: 'விவசாயி நிகர வருமானம்',
      totalOrders: 'மொத்த பண்ணை ஆர்டர்கள்',
      updateStatus: 'ஆர்டர் நிலையை மாற்று',
      stockToggle: 'கையிருப்பில்',
      priceLKR: 'விலை (LKR)',
      unit: 'அளவு அலகு',
      cropCategory: 'பயிர் வகை',
    },
    adminDashboard: {
      title: 'நிர்வாக கட்டுப்பாட்டு மையம்',
      subtitle: 'கணினி மேற்பார்வை, பண்ணை சரிபார்ப்பு மற்றும் பாதுகாப்பு தணிக்கை பதிவுகள்.',
      totalUsers: 'மொத்த பயனாளர்கள்',
      registeredFarmers: 'பதிவுசெய்த விவசாயிகள்',
      verifiedFarms: 'சரிபார்க்கப்பட்ட பண்ணைகள்',
      pendingApprovals: 'நிலுவையிலுள்ள ஒப்புதல்கள்',
      farmVerificationQueue: 'பண்ணை சரிபார்ப்பு வரிசை',
      approve: 'சரிபார்த்து ஒப்புதல் அளி',
      reject: 'நிராகரி',
      userManagement: 'பயனாளர் மேலாண்மை',
      suspendUser: 'இடைநிறுத்து',
      activateUser: 'செயல்படுத்து',
      auditLogs: 'பாதுகாப்பு & தணிக்கை பதிவு',
      platformHealth: 'தள நிலை: சிறப்பானது',
    },
    ownerDashboard: {
      title: 'வணிக உளவுத்துறை பகுப்பாய்வு',
      subtitle: 'தள விற்பனை அளவீடுகள், GMV மற்றும் பிராந்திய விவசாய வர்த்தக வளர்ச்சி.',
      gmvTitle: 'மொத்த வர்த்தக மதிப்பு (GMV)',
      platformRevenue: 'தள நிகர வருவாய் (5% கமிஷன்)',
      activeFarms: 'செயலில் உள்ள பண்ணைகள்',
      topDistricts: 'முன்னணி விவசாய மாவட்டங்கள்',
      salesByDistrict: 'பிராந்திய விற்பனை பகிர்வு',
      monthlyGrowth: 'மாதாந்திர வர்த்தக வளர்ச்சி',
      viewDbSchema: 'PostgreSQL / Supabase கட்டமைப்பு',
      commissionRate: 'கமிஷன் வீதம்: 5.0%',
    },
  },
  si: {
    appName: 'ශ්‍රී ලංකා ඇග්‍රිකනෙක්ට්',
    tagline: 'සෘජු ඩිජිටල් වෙළඳාම තුළින් ලාංකේය ගොවිබිම් සවිබල ගැන්වීම',
    nav: {
      marketplace: 'වෙළඳපොල',
      farms: 'ගොවිපල නාමාවලිය',
      customerDashboard: 'මගේ ඇණවුම්',
      farmerPortal: 'ගොවි ද්වාරය',
      adminConsole: 'පරිපාලක පුවරුව',
      ownerAnalytics: 'හිමිකරු විශ්ලේෂණ',
      cart: 'කරත්තය',
      wishlist: 'පැතුම් ලැයිස්තුව',
      switchRole: 'භූමිකාව මාරු කරන්න',
      loginAs: 'භූමිකා තේරීම',
      logout: 'ඉවත් වන්න',
    },
    hero: {
      badge: 'ශ්‍රී ලංකා ඩිජිටල් කෘෂිකාර්මික වැඩසටහන',
      title: 'දිවයිනේ සරුසාර ගොවිබිම්වලින් සෘජුවම ඔබේ නිවසට',
      titleHighlight: 'සාධාරණ මිල සහ නැවුම් අස්වැන්න',
      subtitle:
        'නුවරඑළිය, යාපනය, අනුරාධපුරය, මහනුවර සහ තවත් ප්‍රදේශවල සහතිකලත් ගොවීන් සමඟ සෘජුව සම්බන්ධ වන්න. අතරමැදියන් නොමැතිව ගොවීන්ට ඉහළ ආදායමක් සහ ඔබට නැවුම් අස්වැන්නක්.',
      exploreBtn: 'නැවුම් අස්වැන්න බලන්න',
      farmerJoinBtn: 'ගොවි කළමනාකරණය',
      statsFarmers: '450+ ලියාපදිංචි ගොවීන්',
      statsDistricts: 'ප්‍රධාන කෘෂිකාර්මික දිස්ත්‍රික්ක 8ක්',
      statsDirectTrade: '100% සෘජු ගොවි වෙළඳාම',
      statsOrganic: 'SL-GAP සහ කාබනික සහතිකලත්',
    },
    marketplace: {
      searchPlaceholder: 'නැවුම් තේ, රතු ළූණු, සුවඳැල් සහල්, කුරුඳු සොයන්න...',
      allDistricts: 'සියලුම දිස්ත්‍රික්ක',
      allCategories: 'සියලුම කාණ්ඩ',
      filterByDistrict: 'දිස්ත්‍රික්කය අනුව',
      filterByCategory: 'කාණ්ඩය',
      priceRange: 'මිල පරාසය',
      organicOnly: 'කාබනික සහතිකලත්',
      verifiedOnly: 'සත්‍යාපිත ගොවිපලවල් පමණි',
      inStockOnly: 'තොග පවතින ද්‍රව්‍ය පමණි',
      sortBy: 'අනුපිළිවෙල',
      sortFeatured: 'විශේෂිත නිෂ්පාදන',
      sortPriceLow: 'මිල: අඩු සිට වැඩි',
      sortPriceHigh: 'මිල: වැඩි සිට අඩු',
      sortRating: 'ඉහළම ශ්‍රේණිගත කිරීම්',
      productsFound: 'අස්වනු භාණ්ඩ තිබේ',
      addToCart: 'කරත්තයට එක් කරන්න',
      addedToCart: 'කරත්තයට එක් කරන ලදී',
      outOfStock: 'තාවකාලිකව තොග අවසන්',
      organicBadge: 'කාබනික',
      slGapBadge: 'SL-GAP සහතිකලත්',
      verifiedFarm: 'සත්‍යාපිත නිෂ්පාදකයා',
      viewFarm: 'ගොවිපල බලන්න',
      harvestedOn: 'අස්වනු නෙලූ දිනය',
    },
    roles: {
      customer: 'පාරිභෝගිකයා',
      farmer: 'ගොවිමහතා / නිෂ්පාදකයා',
      admin: 'පද්ධති පරිපාලක',
      owner: 'වේදිකා හිමිකරු',
      customerDesc: 'නැවුම් දේශීය නිෂ්පාදන තෝරන්න, දිස්ත්‍රික්ක අනුව පෙරහන් කරන්න සහ බහු-ගොවිපල ඇණවුම් කරන්න.',
      farmerDesc: 'ඔබේ ගොවිපල තොරතුරු, තොග ප්‍රමාණයන්, රුපියල් මිල සහ ලැබෙන ඇණවුම් කළමනාකරණය කරන්න.',
      adminDesc: 'ගොවිපල ලියාපදිංචි කිරීම් සත්‍යාපනය කරන්න, පරිශීලකයින් කළමනාකරණය සහ විගණන ලඝු-සටහන් පරීක්ෂා කරන්න.',
      ownerDesc: 'මුළු වෙළඳ වටිනාකම (GMV), 5% කොමිස් ආදායම සහ දිස්ත්‍රික්ක අනුව වර්ධනය නිරීක්ෂණය කරන්න.',
      selectRoleTitle: 'ඔබේ පරිශීලක භූමිකාව තෝරන්න',
      selectRoleSubtitle: 'ශ්‍රී ලංකා ඇග්‍රිකනෙක්ට් පද්ධතිය සම්පූර්ණයෙන්ම අත්විඳීමට ඕනෑම භූමිකාවකට මාරු වන්න.',
      activeRole: 'ක්‍රියාකාරී ප්‍රකාරය',
      switchPrompt: 'භූමිකාව වෙනස් කරන්න',
    },
    cart: {
      title: 'මිලදී ගැනීමේ කරත්තය',
      emptyCart: 'ඔබේ කරත්තය හිස්ව පවතී',
      emptySubtitle: 'දේශීය ගොවීන්ගේ නැවුම් අස්වැන්න ගවේෂණය කර මිලදී ගැනීම අරඹන්න.',
      itemsFromFarms: 'ගොවිපල අනුව වෙන්වීම',
      subtotal: 'අස්වනු මුළු මුදල',
      deliveryFee: 'දිවයින පුරා බෙදාහැරීම',
      multiFarmNotice: 'ස්මාර්ට් බහු-ගොවිපල බෙදීම සක්‍රීයයි',
      checkoutBtn: 'මිලදී ගැනීම සම්පූර්ණ කරන්න',
      farmSplitNotice: 'විවිධ ගොවිපලවලින් ලබාගන්නා අයිතම අදාළ ගොවියාට සෘජුවම වෙන්ව ඇණවුම් කෙරේ.',
      remove: 'ඉවත් කරන්න',
      qty: 'ප්‍රමාණය',
    },
    checkout: {
      title: 'ගෙවීම් සහ බෙදාහැරීම',
      deliveryDetails: 'බෙදාහැරීමේ තොරතුරු',
      fullName: 'සම්පූර්ණ නම',
      phoneNumber: 'දුරකථන අංකය (+94)',
      email: 'විද්‍යුත් තැපෑල',
      address: 'ලිපිනය',
      district: 'බෙදාහැරීමේ දිස්ත්‍රික්කය',
      postalCode: 'තැපැල් කේතය',
      paymentMethod: 'ගෙවීම් ක්‍රමය',
      cod: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (COD)',
      bankTransfer: 'සෘජු බැංකු හුවමාරුව / FriMi / Genie',
      card: 'ක්‍රෙඩිට් / ඩෙබිට් කාඩ්පත් (Visa / Mastercard)',
      placeOrderBtn: 'ඇණවුම තහවුරු කරන්න',
      orderSuccess: 'ඇණවුම සාර්ථකව තහවුරු කරන ලදී!',
      orderSuccessSubtitle: 'සෑම ගොවි මහතෙකුටම කෙටි පණිවිඩ (SMS) මඟින් දැනුම් දෙන ලදී.',
      multiOrderNotice: 'ඔබගේ ඇණවුම සෘජු සැපයුම සඳහා අදාළ ගොවිපලවල් අනුව වෙන් කර ඇත.',
    },
    orderStatus: {
      Pending: 'පොරොත්තුවේ',
      Confirmed: 'තහවුරු කරන ලදී',
      Processing: 'සකසමින් පවතී',
      Shipped: 'බෙදාහැරීමට යවන ලදී',
      Delivered: 'භාර දෙන ලදී',
      Cancelled: 'අවලංගු කරන ලදී',
    },
    farmerDashboard: {
      title: 'ගොවි මෙහෙයුම් මධ්‍යස්ථානය',
      subtitle: 'ඔබේ අස්වනු ලැයිස්තු කළමනාකරණය, ඇණවුම් සැකසීම සහ ශුද්ධ ආදායම නිරීක්ෂණය.',
      farmProfile: 'ගොවිපල තොරතුරු',
      inventory: 'අස්වනු තොගය',
      incomingOrders: 'ලැබුණු ඇණවුම්',
      earnings: 'ආදායම් සහ ගෙවීම්',
      addProduct: 'නව භෝගයක් එක් කරන්න',
      editProduct: 'නිෂ්පාදනය සංස්කරණය',
      deleteProduct: 'ලැයිස්තුවෙන් ඉවත් කරන්න',
      grossSales: 'මුළු ගොවිපල විකුණුම්',
      commissionFee: 'වේදිකා ගාස්තුව (5%)',
      netPayout: 'ගොවියාගේ ශුද්ධ ආදායම',
      totalOrders: 'මුළු ඇණවුම් සංඛ්‍යාව',
      updateStatus: 'ඇණවුමේ තත්ත්වය යාවත්කාලීන කරන්න',
      stockToggle: 'තොග පවතී',
      priceLKR: 'මිල (රුපියල්)',
      unit: 'මිනුම් ඒකකය',
      cropCategory: 'භෝග කාණ්ඩය',
    },
    adminDashboard: {
      title: 'පරිපාලන මෙහෙයුම් පුවරුව',
      subtitle: 'පද්ධති අධීක්ෂණය, ගොවිපල අනුමැතිය සහ ආරක්‍ෂිත විගණන ලඝු-සටහන්.',
      totalUsers: 'මුළු පරිශීලකයින්',
      registeredFarmers: 'ලියාපදිංචි ගොවීන්',
      verifiedFarms: 'සත්‍යාපිත ගොවිපලවල්',
      pendingApprovals: 'අනුමැතිය අපේක්ෂිත ගොවිපලවල්',
      farmVerificationQueue: 'ගොවිපල සත්‍යාපන පෝලිම',
      approve: 'සත්‍යාපනය කර අනුමත කරන්න',
      reject: 'ප්‍රතික්ෂේප කරන්න',
      userManagement: 'පරිශීලක කළමනාකරණය',
      suspendUser: 'අත්හිටුවන්න',
      activateUser: 'ක්‍රියාත්මක කරන්න',
      auditLogs: 'පද්ධති විගණන සටහන්',
      platformHealth: 'පද්ධති තත්ත්වය: සක්‍රියයි',
    },
    ownerDashboard: {
      title: 'ව්‍යාපාරික විශ්ලේෂණ පුවරුව',
      subtitle: 'වේදිකා කාර්යසාධනය, මුළු වෙළඳ වටිනාකම (GMV) සහ ප්‍රාදේශීය වර්ධනය.',
      gmvTitle: 'මුළු වෙළඳ වටිනාකම (GMV)',
      platformRevenue: 'වේදිකා ශුද්ධ ආදායම (5% කොමිස්)',
      activeFarms: 'ක්‍රියාකාරී ගොවිපලවල්',
      topDistricts: 'ඉහළම නිෂ්පාදන දිස්ත්‍රික්ක',
      salesByDistrict: 'ප්‍රාදේශීය විකුණුම් ව්‍යාප්තිය',
      monthlyGrowth: 'මාසික වෙළඳ වර්ධනය',
      viewDbSchema: 'PostgreSQL / Supabase දත්ත ව්‍යුහය',
      commissionRate: 'කොමිස් ප්‍රතිශතය: 5.0%',
    },
  },
};
