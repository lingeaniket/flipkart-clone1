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