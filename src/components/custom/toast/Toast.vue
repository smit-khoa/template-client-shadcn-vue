<script setup lang="ts">
import { Toaster } from "vue-sonner"
</script>

<template>
    <Toaster
        position="top-right"
        :duration="4000"
        :toast-options="{
            unstyled: true,
            classes: {
                toast: 'toast-custom group',
                title: 'toast-title',
                description: 'toast-description',
                actionButton: 'toast-action-button',
                cancelButton: 'toast-cancel-button',
                closeButton: 'toast-close-button',
                success: 'toast-success',
                error: 'toast-error',
                warning: 'toast-warning',
                info: 'toast-info'
            }
        }"
        close-button />
</template>

<style lang="scss">
// Toast Container
.toast-custom {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px 20px 20px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    min-width: 320px;
    max-width: 420px;
    box-shadow:
        0px 1px 1px -0.5px rgba(0, 0, 0, 0.03),
        0px 3px 3px -1.5px rgba(0, 0, 0, 0.03),
        0px 20px 20px -12px rgba(0, 0, 0, 0.2);

    // Progress bar at bottom
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6px;
        width: 100%;
        opacity: 0.8;
        animation: toast-progress 4s linear forwards;
    }

    // Icon styling
    [data-icon] {
        width: 20px;
        height: 20px;
        flex-shrink: 0;

        svg {
            width: 100%;
            height: 100%;
            color: white;
        }
    }

    // Content wrapper
    [data-content] {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 0;
    }
}

// Title
.toast-title {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: white;
}

// Description
.toast-description {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    color: #f9f8fc;
}

// Close button
.toast-close-button {
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    left: auto !important;
    width: 16px !important;
    height: 16px !important;
    background: transparent !important;
    border: none !important;
    opacity: 0.8;
    cursor: pointer;
    padding: 0 !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    transform: none !important;
    color: white !important;

    &:hover {
        opacity: 1;
    }

    svg {
        width: 12px;
        height: 12px;
        color: white;
    }
}

// Action button
.toast-action-button {
    background: white;
    color: #1a2229;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
}

// Cancel button
.toast-cancel-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
}

// Success toast - Green
.toast-success {
    background: #12b76a;

    &::after {
        background: #a6f4c5;
    }
}

// Error toast - Red
.toast-error {
    background: #ff3a3a;

    &::after {
        background: #fecdca;
    }
}

// Warning toast - Yellow/Orange
.toast-warning {
    background: #fdb022;

    &::after {
        background: #fedf89;
    }
}

// Info toast - Blue
.toast-info {
    background: #0069fe;

    &::after {
        background: #98cffe;
    }
}

// Default toast (when no type specified)
.toast-custom:not(.toast-success):not(.toast-error):not(.toast-warning):not(.toast-info) {
    background: #0069fe;

    &::after {
        background: #98cffe;
    }
}

// Progress bar animation
@keyframes toast-progress {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}

// Sonner default overrides
[data-sonner-toaster] {
    --normal-bg: #0069fe;
    --normal-border: transparent;
    --normal-text: white;
    --success-bg: #12b76a;
    --success-border: transparent;
    --success-text: white;
    --error-bg: #ff3a3a;
    --error-border: transparent;
    --error-text: white;
    --warning-bg: #fdb022;
    --warning-border: transparent;
    --warning-text: white;
    --info-bg: #0069fe;
    --info-border: transparent;
    --info-text: white;
}
</style>
