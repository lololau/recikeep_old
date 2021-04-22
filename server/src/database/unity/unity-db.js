// Default units

export default [
    { unit: 'ml', upscaling: 'cl', upscaling_factor: 10 },
    { unit: 'cl', upscaling: 'dl', upscaling_factor: 10, downscaling: 'ml', downscaling_factor: 10 },
    { unit: 'dl', upscaling: 'L', upscaling_factor: 10, downscaling: 'cl', downscaling_factor: 10 },
    { unit: 'L', downscaling: 'dl', downscaling_factor: 10 },
    { unit: 'mg', upscaling: 'g', upscaling_factor: 1000 },
    { unit: 'g', upscaling: 'kg', upscaling_factor: 1000, downscaling: 'mg', downscaling_factor: 1000 },
    { unit: 'kg', downscaling: 'g', downscaling_factor: 1000 },
    { unit: '-' },
];
