export const textFields = [
    [
        {
            label: "Name",
            name: "name",
            required: true,
            className: '32'
        },
        {
            label: '10 digit mobile number',
            name: 'phone',
            required: true,
            className: '32'
        }
    ],
    [
        {
            label: "Pincode",
            name: "pincode",
            required: true,
            className: '32'
        },
        {
            label: 'Locality',
            name: 'locality',
            required: true,
            className: '32'
        }
    ],
    [
        {
            label: "Address (Area and Street)",
            name: "address",
            required: true,
            className: '33',
            multiline: true,
            rows: 3
        }
    ],
    [
        {
            label: "City/District/Town",
            name: "area",
            required: true,
            className: '32'
        },
        {
            label: 'State',
            name: 'state',
            required: true,
            className: '32'
        }
    ],
    [
        {
            label: "Landmark (Optional",
            name: "landmark",
            required: false,
            className: '32'
        },
        {
            label: 'Alternate Phone (Optional)',
            name: 'alt_phone',
            required: false,
            className: '32'
        }
    ]
]

export const BankOptions = [
    { value: "AIRTELMONEY", bankName: 'Airtel Payments Bank' },
    { value: "AUSMALLFINBANK", bankName: 'AU Small Finance Bank' },
    { value: "BANDHAN", bankName: 'Bandhan Bank' },
    { value: "BASSIENCATHOLICCOOPB", bankName: 'Bassien Catholic Co-Operative Bank' },
    { value: "BNPPARIBAS", bankName: 'BNP Paribas' },
    { value: "BOBAHRAIN", bankName: 'Bank of Bahrain and Kuwait' },
    { value: "BOBARODA", bankName: 'Bank of Baroda' },
    { value: "BOBARODAC", bankName: 'Bank of Baroda Corporate' },
    { value: "BOBARODAR", bankName: 'Bank of Baroda Retail' },
    { value: "BOI", bankName: 'Bank of India' },
    { value: "BOM", bankName: 'Bank of Maharashtra' },
    { value: "CANARA", bankName: 'Canara Bank' },
    { value: "CATHOLICSYRIAN", bankName: 'Catholic Syrian Bank' },
    { value: "CBI", bankName: 'Central Bank' },
    { value: "CITYUNION", bankName: 'City Union Bank' },
    { value: "CORPORATION", bankName: 'Corporation Bank' },
    { value: "COSMOS", bankName: 'Cosmos Co-op Bank' },
    { value: "DBS", bankName: 'digibank by DBS' },
    { value: "DCB", bankName: 'DCB BANK LTD' },
    { value: "DENA", bankName: 'Dena Bank' },
    { value: "DEUTSCHE", bankName: 'Deutsche Bank' },
    { value: "DHANBANK", bankName: 'Dhanalakshmi Bank' },
    { value: "FEDERALBANK", bankName: 'Federal Bank' },
    { value: "HSBC", bankName: 'HSBC' },
    { value: "IDBI", bankName: 'IDBI Bank' },
    { value: "IDFC", bankName: 'IDFC FIRST Bank' },
    { value: "INDIANBANK", bankName: 'Indian Bank' },
    { value: "INDUSIND", bankName: 'IndusInd Bank' },
    { value: "IOB", bankName: 'Indian Overseas Bank' },
    { value: "JANATABANKPUNE", bankName: 'JANATA SAHAKARI BANK LTD PUNE' },
    { value: "JKBANK", bankName: 'J&amp;K Bank' },
    { value: "KARNATAKA", bankName: 'Karnataka Bank' },
    { value: "KARURVYSYA", bankName: 'Karur Vysya Bank' },
    { value: "LAKSHMIVILAS", bankName: 'Lakshmi Vilas Bank - Retail' },
    { value: "LAKSHMIVILASC", bankName: 'Lakshmi Vilas Bank - Corporate' },
    { value: "PNB", bankName: 'Punjab National Bank' },
    { value: "PNBC", bankName: 'Punjab National Bank Corporate' },
    { value: "PNSB", bankName: 'Punjab &amp; Sind Bank' },
    { value: "PUNJABMAHA", bankName: 'Punjab &amp; Maharashtra Co-op Bank' },
    { value: "RATNAKAR", bankName: 'RBL Bank Limited' },
    { value: "RBS", bankName: 'RBS' },
    { value: "SARASWAT", bankName: 'Saraswat Co-op Bank' },
    { value: "SHAMRAOVITHAL", bankName: 'Shamrao Vithal Co-op Bank' },
    { value: "SHIVAMERCOOP", bankName: 'Shivalik Mercantile Co-op Bank' },
    { value: "SOUTHINDIAN", bankName: 'The South Indian Bank' },
    { value: "STANC", bankName: 'Standard Chartered Bank' },
    { value: "TMBANK", bankName: 'Tamilnad Mercantile Bank Limited' },
    { value: "TNMERCANTILE", bankName: 'Tamil Nadu Merchantile Bank' },
    { value: "TNSC", bankName: 'TNSC Bank' },
    { value: "UCO", bankName: 'UCO Bank' },
    { value: "UNIONBANK", bankName: 'Union Bank of India' },
    { value: "YESBANK", bankName: 'Yes Bank' },
    { value: "ZOROACOPBANK", bankName: 'The Zoroastrian Co-Operative Bank' },
]

export const BankRadio = [
    { value: 'HDFC', bankName: 'HDFC Bank' },
    { value: 'ICICI', bankName: 'ICICI Bank' },
    { value: 'SBI', bankName: 'State Bank of India' },
    { value: 'AXIS', bankName: 'Axis Bank' },
    { value: 'KOTAK', bankName: 'Kotak Mahindra Bank' }
]