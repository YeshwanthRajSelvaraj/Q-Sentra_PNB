// mockData.js — Q-Sentra PNB QuantumGuard

export const dashboardStats = {
  totalAssets: 128,
  pqcScore: 43.4,
  assetsAtRisk: 60,
  pqcReady: 10,
};

export const recentActivity = [
  { id:1, color:'#10b981', text:'Full scan completed — 128 assets analyzed', time:'2 min ago' },
  { id:2, color:'#ef4444', text:'Critical: 14 assets using RSA key exchange — quantum vulnerable', time:'5 min ago' },
  { id:3, color:'#00c8ff', text:'CT Log Monitor: 3 new domains discovered under *.pnb.co.in', time:'12 min ago' },
  { id:4, color:'#a855f7', text:'REM-002 in progress: Net banking PQC migration at 45%', time:'1 hr ago' },
  { id:5, color:'#10b981', text:'QCERT-003 issued for treasury.pnb.co.in — Score: 91', time:'6 hrs ago' },
  { id:6, color:'#ef4444', text:'HNDL Risk: netbanking.pnb.co.in liability ₹2,500 Cr', time:'8 hrs ago' },
  { id:7, color:'#f59e0b', text:'Certificate expiring soon: api.pnb.co.in (14 days)', time:'10 hrs ago' },
];

export const geoAssets = [
  { city: 'Mumbai',    lat: 19.07, lng: 72.87, count: 34, x: '72%', y: '48%' },
  { city: 'Delhi',     lat: 28.61, lng: 77.20, count: 28, x: '74%', y: '38%' },
  { city: 'Bangalore', lat: 12.97, lng: 77.59, count: 22, x: '73%', y: '56%' },
  { city: 'Chennai',   lat: 13.08, lng: 80.27, count: 18, x: '76%', y: '57%' },
  { city: 'Kolkata',   lat: 22.57, lng: 88.36, count: 12, x: '80%', y: '45%' },
  { city: 'London',    lat: 51.50, lng: -0.12, count:  4, x: '47%', y: '24%' },
  { city: 'Singapore', lat:  1.35, lng: 103.82, count: 6, x: '83%', y: '60%' },
  { city: 'New York',  lat: 40.71, lng: -74.01, count: 4, x: '27%', y: '33%' },
];

export const assetInventory = [
  { id:1, name:'portal.pnb.co.in',    url:'https://portal.pnb.co.in',    ipv4:'34.12.11.45',  ipv6:'2001:0db8:85a3::7334', type:'Web App',  owner:'IT',     risk:'High',   certStatus:'Valid',    keyLength:'2048-bit', lastScan:'2 hrs ago' },
  { id:2, name:'api.pnb.co.in',       url:'https://api.pnb.co.in',       ipv4:'34.12.11.90',  ipv6:'2001:0db8:85a3::1111', type:'API',      owner:'DevOps', risk:'Medium', certStatus:'Expiring', keyLength:'4096-bit', lastScan:'5 hrs ago' },
  { id:3, name:'vpn.pnb.co.in',       url:'https://vpn.pnb.co.in',       ipv4:'34.55.90.21',  ipv6:'2001:0db8::0990:abcd', type:'Gateway',  owner:'Infra',  risk:'Critical',certStatus:'Expired',  keyLength:'1024-bit', lastScan:'1 hr ago' },
  { id:4, name:'mail.pnb.co.in',      url:'https://mail.pnb.co.in',      ipv4:'35.11.44.10',  ipv6:'2001:0db8::0a10:ff21', type:'Server',   owner:'IT',     risk:'Low',    certStatus:'Valid',    keyLength:'3072-bit', lastScan:'1 day ago' },
  { id:5, name:'netbanking.pnb.co.in',url:'https://netbanking.pnb.co.in',ipv4:'34.77.21.12',  ipv6:'2001:0db8::0b30:3344', type:'Web App',  owner:'IT',     risk:'Medium', certStatus:'Valid',    keyLength:'2048-bit', lastScan:'5 days ago' },
  { id:6, name:'treasury.pnb.co.in',  url:'https://treasury.pnb.co.in',  ipv4:'35.24.18.67',  ipv6:'2001:0db8::1a2b:3c4d', type:'Web App',  owner:'Finance',risk:'Low',    certStatus:'Valid',    keyLength:'4096-bit', lastScan:'3 hrs ago' },
  { id:7, name:'mobileapi.pnb.co.in', url:'https://mobileapi.pnb.co.in', ipv4:'34.18.77.33',  ipv6:'2001:0db8::5e6f:7890', type:'API',      owner:'Mobile', risk:'High',   certStatus:'Valid',    keyLength:'2048-bit', lastScan:'30 min ago' },
  { id:8, name:'swift.pnb.co.in',     url:'https://swift.pnb.co.in',     ipv4:'34.55.12.88',  ipv6:'2001:0db8::ab12:cd34', type:'API',      owner:'Finance',risk:'Critical',certStatus:'Valid',    keyLength:'1024-bit', lastScan:'1 hr ago' },
];

export const domains = [
  { detectionDate:'03 Mar 2026', domainName:'www.cos.pnb.bank.in',  registrationDate:'17 Feb 2005', registrar:'National Internet Exchange of India', company:'PNB', status:'New' },
  { detectionDate:'17 Oct 2024', domainName:'www2.pnbrrbkiosk.in', registrationDate:'22 Mar 2021', registrar:'National Internet Exchange of India', company:'PNB', status:'New' },
  { detectionDate:'17 Oct 2024', domainName:'upload.pnbuniv.net.in',registrationDate:'22 Mar 2021', registrar:'National Internet Exchange of India', company:'PNB', status:'Confirmed' },
  { detectionDate:'17 Oct 2024', domainName:'postman.pnb.bank.in',  registrationDate:'22 Mar 2021', registrar:'National Internet Exchange of India', company:'PNB', status:'New' },
  { detectionDate:'17 Nov 2024', domainName:'proxy.pnb.bank.in',    registrationDate:'17 Nov 2024', registrar:'National Internet Exchange of India', company:'PNB', status:'False Positive' },
];

export const sslCerts = [
  { detectionDate:'10 Mar 2026', sha:'b7563b983bfd217d471f607c9bbc509034a6', validFrom:'08 Feb 2026', commonName:'Generic Cert for WF Ovrd', company:'PNB', ca:'Symantec', status:'New' },
  { detectionDate:'10 Mar 2026', sha:'d8527f5c3e99b37164a8f3274a914506c94',  validFrom:'07 Feb 2026', commonName:'Generic Cert for WF Ovrd', company:'PNB', ca:'DigiCert', status:'New' },
  { detectionDate:'10 Mar 2026', sha:'Abe3195b86704f88cb75c7bcd11c69b9e493', validFrom:'06 Feb 2026', commonName:'Generic Cert for WF Ovrd', company:'PNB', ca:'Entrust',  status:'Confirmed' },
];

export const ipSubnets = [
  { detectionDate:'05 Mar 2026', ip:'40.104.62.216',  ports:'80',     subnet:'103.107.224.0/22', asn:'AS9583', netname:'MSFT',            location:'—',          company:'Punjab National Bank' },
  { detectionDate:'17 Oct 2024', ip:'40.101.72.212',  ports:'80',     subnet:'103.107.224.0/22', asn:'AS9583', netname:'—',               location:'India',      company:'Punjab National Bank' },
  { detectionDate:'17 Oct 2024', ip:'103.25.151.22',  ports:'53,80',  subnet:'103.107.224.0/22', asn:'AS9583', netname:'Quantum-Link-Co',  location:'Nashik, India',company:'Punjab National Bank' },
  { detectionDate:'17 Nov 2024', ip:'181.65.122.92',  ports:'80,443', subnet:'103.107.224.0/22', asn:'AS9583', netname:'E2E-Networks-IN',  location:'Chennai, India',company:'Punjab National Bank' },
  { detectionDate:'17 Nov 2024', ip:'20.153.63.72',   ports:'443',    subnet:'103.107.224.0/22', asn:'AS9583', netname:'—',               location:'Leh, India',company:'Punjab National Bank' },
  { detectionDate:'17 Nov 2024', ip:'21.151.42.188',  ports:'22',     subnet:'103.107.224.0/22', asn:'AS9583', netname:'—',               location:'India',      company:'Punjab National Bank' },
];

export const software = [
  { detectionDate:'05 Mar 2026', product:'http_server', version:'—',       type:'WebServer',  port:'443', host:'49.51.98.173',  company:'PNB' },
  { detectionDate:'17 Oct 2024', product:'http_server', version:'—',       type:'WebServer',  port:'587', host:'49.52.123.215', company:'PNB' },
  { detectionDate:'17 Oct 2024', product:'Apache',      version:'—',       type:'WebServer',  port:'443', host:'40.59.99.173',  company:'PNB' },
  { detectionDate:'17 Oct 2024', product:'IIS',         version:'10.0',    type:'WebServer',  port:'80',  host:'40.101.27.212', company:'PNB' },
  { detectionDate:'17 Nov 2024', product:'Microsoft IIS',version:'10.0',   type:'WebServer',  port:'80',  host:'401.10.274.14', company:'PNB' },
  { detectionDate:'06 Mar 2026', product:'OpenResty',   version:'1.27.1.1',type:'Web Server', port:'2087',host:'66.68.262.93',  company:'PNB' },
];

export const cbomData = {
  totalApps: 17,
  sitesSurveyed: 56,
  activeCerts: 93,
  weakCrypto: 22,
  certIssues: 7,
  keyLengthDist: [
    { name:'4096', value:36, fill:'#10b981' },
    { name:'3072', value:28, fill:'#00c8ff' },
    { name:'2048', value:24, fill:'#f59e0b' },
    { name:'2044', value:4,  fill:'#ef4444' },
    { name:'<2048',value:8,  fill:'#ff1744' },
  ],
  cipherUsage: [
    { name:'ECDHE-RSA-AES256-GCM-SHA384', count:29, fill:'#10b981' },
    { name:'ECDHE-ECDSA-AES256-GCM-SHA384',count:23, fill:'#00c8ff' },
    { name:'AES256-GCM-SHA384',           count:19, fill:'#a855f7' },
    { name:'AES128-GCM-SHA256',           count:15, fill:'#f59e0b' },
    { name:'TLS_RSA_WITH_DES_CBC_SHA',    count:9,  fill:'#ef4444' },
  ],
  topCAs: [
    { name:'DigiCert', value:39, fill:'#00c8ff' },
    { name:'Thawte',   value:39, fill:'#a855f7' },
    { name:"Let's Encrypt", value:14, fill:'#10b981' },
    { name:'COMODO',   value:8,  fill:'#f59e0b' },
  ],
  encryptionProtocols: [
    { name:'TLS 1.3', value:72, fill:'#10b981' },
    { name:'TLS 1.2', value:20, fill:'#00c8ff' },
    { name:'TLS 1.1', value:8,  fill:'#f59e0b' },
  ],
  appCerts: [
    { app:'portal.pnb.co.in',   keyLength:'2048-Bit', cipher:'ECDHE-RSA-AES256-GCM-SHA384', ca:'DigiCert', status:'ok' },
    { app:'vpn.pnb.co.in',      keyLength:'1024-Bit', cipher:'TLS_RSA_WITH_DES_CBC_SHA',    ca:'COMODO',   status:'critical' },
    { app:'netbanking.pnb.co.in',keyLength:'4096-Bit', cipher:'TCSH E-RSA_AES56-GCM-SHA384', ca:'COMODO',  status:'ok' },
    { app:'swift.pnb.co.in',    keyLength:'4096-Bit', cipher:'TLS_RSA_AES256_GCM_SHA384',   ca:'loopDot',  status:'ok' },
  ],
};

export const pqcPosture = {
  elitePct: 45, standardPct: 30, legacyPct: 15, criticalCount: 8,
  classificationGrade: { elite:37, critical:2, standard:4 },
  assets: [
    { name:'Digigrihavatika.pnbuat.bank.in (103.109.225.128)', pqcSupport: true  },
    { name:'wcw.pnb.bank.in (103.109.225.201)',                 pqcSupport: true  },
    { name:'Wbbgb.pnbuk.bank.in (103.109.224.249)',             pqcSupport: false },
  ],
  improvements: [
    'Upgrade to TLS 1.3 with PQC',
    'Implement Kyber for Key Exchange',
    'Update Cryptographic Libraries',
    'Develop PQC Migration Plan',
  ],
  appDetails: {
    name:'App A', owner:'Team 1', exposure:'Internet',
    tls:'RSA / ECC', score:480, status:'Legacy',
  },
};

export const cyberRating = {
  score: 755,
  status: 'Elite-PQC',
  urlScores: [
    { url:'netbanking.pnb.co.in',  score:92, tier:'Elite' },
    { url:'portal.pnb.co.in',      score:85, tier:'Elite' },
    { url:'treasury.pnb.co.in',    score:78, tier:'Elite' },
    { url:'api.pnb.co.in',         score:65, tier:'Standard' },
    { url:'mobileapi.pnb.co.in',   score:60, tier:'Standard' },
    { url:'vpn.pnb.co.in',         score:35, tier:'Legacy' },
    { url:'swift.pnb.co.in',       score:22, tier:'Critical' },
    { url:'mail.pnb.co.in',        score:70, tier:'Standard' },
  ],
};

export const scoreHistory = [
  { month:'Sep', score:38 },
  { month:'Oct', score:39 },
  { month:'Nov', score:40 },
  { month:'Dec', score:41 },
  { month:'Jan', score:41.5 },
  { month:'Feb', score:42.8 },
  { month:'Mar', score:43.4 },
];
