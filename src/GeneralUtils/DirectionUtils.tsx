
export type HorizontalDirection = 'left' | 'right';

/**
 * Flips an svg if direction 'right' is provided.
 * Does nothing when 'left' is provided as it is the default
 * orientation of the used svg images.
 */
export const HorizontalDirectionIntoTransform: Record<HorizontalDirection, string> = {
    left: 'scale(1, 1)',
    right: 'scale(-1, 1)'
}
